import React, { useState, useEffect } from "react";
import { Container, PostCard, Signup } from '../index';
import service from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        service.getPosts([]).then((post) => {
            if (post) {
                setPosts(post.documents);
            }
            setLoading(false);
        });
    }, []);

    const state = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap w-full h-screen">
                        <div className="flex w-full h-60 justify-between items-center px-4">
                            <img src="/img3.jpg" className="w-1/6 h-auto animate-slide-down" />
                            <div>
                                <h1 className="text-5xl text-white"> Create Your Passion Your Way</h1>
                                <h2 className="text-left text-2xl text-white text-center">Create Unique and beautiful posts </h2>
                                <button
                                    onClick={() => navigate(`/signup`)}
                                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition mt-5"
                                >
                                    Create Post Now
                                </button>
                            </div>
                            <img src="/img4.jpg" className="w-1/6 h-auto animate-slide-down " />
                        </div>
                        <div className="p-2 w-full flex justify-center items-center ">
                            <img src="https://blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEhw5K6-sy8Pgp7Yply7EXGI9Tqy6t-0ojmL_JZbdyIHjgthYQnpxqUesl5wZfpbiMwHN_x3M6CAEiND5MqGsHE1MEUOSvyXn3PHFWv8Cw_NlPzQEkPnYwS61RGHVmGXXwvTNcgBV0VMz-U2ecMArpMVGrwVaYXl4Fo/w192" className="w-1/4 h-auto animate-slide-down mt-auto"
                            />
                            <img src="https://blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEhwB_tKV4qGuHpuGsTd0oMTxRTyuybrSENqr9vJwDu5WUQjyZMLPlF5KIvtpTUlcXXt2SxApn63nnfFYVOcjsljhUdesfFZMRStztab9eNx9G0oUUJl6fWCQFLk58v5MGMSeYREZ03VkdTEthhTJ8p32nR3/w1200" className="w-3/5 h-auto animate-slide-down mt-20 "
                            />
                            <img src="https://blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEgyvdFoqjrmmYno-IBsz_Np4Y96DWbu-queWNrwLP4F6vV4BsGZO6HmpEycB1kfC4QjIAUQRPigDTekhN3o1E9GFoCx0nUGzG2Km8OnZM8A4UQWTSEccZqq02gj6lm5buUtM0FUnFLHmm7le3LzKhIgWag/w256" className="w-1/4 h-auto animate-slide-down mt-auto"
                            />
                        </div>
                    </div>
                        <img 
                        className=" w-full h-80 object-cover"
                        src="https://tse3.mm.bing.net/th/id/OIP.sd2nOUY1dyJbehNlJ054RgHaEK?rs=1&pid=ImgDetMain" />
                    <div className="bg-[#388D80] py-8  mt-4 text-center text-white flex group ">
                        <img src="/filler2.jpg" className="w-1/3 h-auto a group-hover:animate-zoom-in" />
                        <div className="text-left ml-20 text-center ">
                            <h1 className="text-5xl mb-5  mt-20"> Hang onto your Memories</h1>
                            <h2 className="text-left text-2xl">Save the moments that matter. Blogger lets you safely store </h2>
                            <h2 className="text-2xl">thousands of posts, photos!</h2>
                            <img src="/filler4.jpg" className="group-hover:animate-bounce-in" />
                            <img src="/filler5.jpg" />
                        </div>
                        <img src="/filler3.jpg" />
                    </div>
                    <div className="bg-[#4583AA] py-8 mt-4 text-center text-white flex group ">
                        <img src="/img6.jpg" className="w-1/5 h-auto a group-hover:animate-zoom-in" />
                        <div className="text-left ml-20 text-center ">
                            <h1 className="text-5xl mb-5  mt-20"> Choose the perfect designs</h1>
                            <h2 className="text-left text-2xl">Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.</h2>
                            <div className="flex justify-between">
                                <img src="/img5.jpg" className="group-hover:animate-bounce-in" />
                                <img src="/img8.jpg" className="group-hover:animate-bounce-in mr-20" />
                            </div>
                        </div>
                        <img src="/img7.jpg" />
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
            <Container>
                <div className="pt-6 pb-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-white">Your <span className="text-yellow-500">Blog</span> Feed</h1>
                        <button
                            onClick={() => navigate('/add-post')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Create Post
                        </button>
                    </div>

                    <div className="mt-8 mb-6 bg-gradient-to-r from-[#388D80] to-[#4583AA] p-6 rounded-xl shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="bg-white rounded-full p-3">
                                <svg className="w-8 h-8 text-[#388D80]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">Welcome to Your Creative Space</h2>
                                <p className="text-gray-200">Explore trending posts or create something amazing today</p>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="bg-gray-800 rounded-xl p-8 text-center">
                        <svg className="mx-auto h-16 w-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <h3 className="mt-4 text-xl font-medium text-white">No posts yet</h3>
                        <p className="mt-2 text-gray-400">Be the first to create an amazing post!</p>
                        <button
                            onClick={() => navigate('/add-post')}
                            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                        >
                            Create Your First Post
                        </button>
                        <div
                        className="w-full h-80 my-8"
                        style={{
                            backgroundImage: "url('https://eyesonsolution.com/wp-content/uploads/2024/02/AdobeStock_116135283_resized-min.jpg')",
                            backgroundSize: "cover",
                        }}
                        ></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {posts.map((post) => (
                                <div key={post.$id} className="transform transition duration-300 hover:scale-105">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-[#388D80] rounded-xl p-6 shadow-lg text-white">
                            <h3 className="text-xl font-bold mb-3">Looking for inspiration?</h3>
                            <p className="mb-4">Explore trending topics and create content that resonates with your audience.</p>
                            <div className="flex flex-wrap gap-2">
                                {['Travel', 'Technology', 'Food', 'Photography', 'Art'].map((tag) => (
                                    <span key={tag} className="bg-white/20 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-white/30 transition">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
}