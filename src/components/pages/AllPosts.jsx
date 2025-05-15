import React, { useState, useEffect } from "react";
import { Container, PostCard } from "..";
import { useSelector } from "react-redux";
import service from "../../appwrite/config";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData ? userData.$id : null;

    useEffect(() => {
        setLoading(true);
        service.getPosts([])
            .then((post) => {
                if (post) {
                    const userPosts = post.documents.filter(post => post.userId === userId);
                    setPosts(userPosts);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please try again later.");
                setLoading(false);
            });
    }, []);

    return (
        <div
            style={{
                backgroundImage: "url('https://wallpapers.com/images/hd/board-background-csctpsx1n8iyausz.jpg')",
                backgroundSize: 'cover',
            }}
         className="w-full py-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
            <Container>
                <div className="pb-6">
                    <h1 className="text-3xl font-bold text-white mb-6">My <span className="text-yellow-500">Blog</span> Posts</h1>
                    
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg text-center text-white">
                            <p>{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-4 bg-white text-red-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                Retry
                            </button>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="bg-gray-800 rounded-xl p-8 text-center">
                            <svg className="mx-auto h-16 w-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <h3 className="mt-4 text-xl font-medium text-white">No posts available</h3>
                            <p className="mt-2 text-gray-400">Check back later for new content</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {posts.map((post) => (
                                <div key={post.$id} className="transform transition duration-300 hover:scale-105">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}