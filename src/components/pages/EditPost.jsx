import React, { useState, useEffect } from "react"; 
import { Container, PostForm } from ".."; 
import service from "../../appwrite/config"; 
import { useNavigate, useParams } from "react-router-dom";  

export default function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [navigate, slug]);
    
    return post ? (
        <div className="w-full h py-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
            <div className="relative z-10 py-8">
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        </div>
    ) : (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen w-full flex items-center justify-center">
            <p className="text-white">Loading...</p>
        </div>
    );
}