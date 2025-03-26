import React, { useState, useEffect } from "react";
import { Container, PostCard, Signup } from '../index'
import service from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        }
        )
    }, [])

    const state = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    if (!state) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap w-full h-screen">
                        <div className="flex w-full h-60 justify-between items-center px-4">
                            <img src="public/img3.jpg" className="w-1/6 h-auto animate-slide-down" />
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
                            <img src="public/img4.jpg" className="w-1/6 h-auto animate-slide-down " />
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
                    <img src="public/filler.png" />
                    <div className="bg-[#388D80] py-8 mt-4 text-center text-white flex group ">
                        <img src="public/filler2.jpg" className="w-1/3 h-auto a group-hover:animate-zoom-in" />
                        <div className="text-left ml-20 text-center ">
                            <h1 className="text-5xl mb-5  mt-20"> Hang onto your Memories</h1>
                            <h2 className="text-left text-2xl">Save the moments that matter. Blogger lets you safely store </h2>
                            <h2 className="text-2xl">thousands of posts, photos!</h2>
                            <img src="public/filler4.jpg" className="group-hover:animate-bounce-in" />
                            <img src="public/filler5.jpg" />
                        </div>
                        <img src="public/filler3.jpg" />
                    </div>
                    <div className="bg-[#4583AA] py-8 mt-4 text-center text-white flex group ">
                        <img src="public/img6.jpg" className="w-1/5 h-auto a group-hover:animate-zoom-in" />
                        <div className="text-left ml-20 text-center ">
                            <h1 className="text-5xl mb-5  mt-20"> Choose the perfect designs</h1>
                            <h2 className="text-left text-2xl">Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.</h2>
                            <div className="flex justify-between">
                            <img src="public/img5.jpg" className="group-hover:animate-bounce-in" />
                            <img src="public/img8.jpg" className="group-hover:animate-bounce-in mr-20" />
                            </div>
                        </div>
                        <img src="public/img7.jpg" />
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <>
            <h1 className="txt-xl font-bold text-white">BLOG</h1>
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    )
}
