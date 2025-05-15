import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from '../../appwrite/config';
import { Button, Container } from "..";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div 
         style={{
                backgroundImage: "url('https://p0.pikist.com/photos/212/711/typewriter-book-notes-paper-writing-write-antique-retro-desk.jpg')",
                backgroundSize: 'cover',
            }}
        className="min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto pt-8 pb-16">
                    <div className="bg-gradient-to-b from-orange-50 to-red-50 rounded-2xl shadow-xl overflow-hidden border-2 border-red-200">
                        <div className="relative">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <img
                                    src={service.getFileView(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {isAuthor && (
                                <div className="absolute right-6 top-6 flex gap-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button 
                                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-lg"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button 
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
                                        onClick={deletePost}
                                    >
                                        Delete
                                    </Button>
                                    <Link to="/">
                                        <Button 
                                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 shadow-lg"
                                        >
                                            Post
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="p-8">
                            <div className="bg-white/80 rounded-xl p-6 backdrop-blur-sm shadow-inner">
                                <h1 className="text-3xl font-bold text-red-900 mb-4 border-b-2 border-red-200 pb-4">
                                    {post.title}
                                </h1>
                                
                                <div className="prose prose-lg max-w-none prose-red prose-headings:text-red-900 prose-p:text-gray-800 prose-a:text-red-600 hover:prose-a:text-red-700">
                                    {parse(post.content)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-8 pb-8 flex justify-end">
                            <Link to="/">
                                <Button 
                                    className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors duration-200 shadow-lg"
                                >
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}