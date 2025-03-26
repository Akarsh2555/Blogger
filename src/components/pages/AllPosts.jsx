import React from "react";
import { useState, useEffect } from 'react';
import { Container, PostCard } from "..";
import service from "../../appwrite/config";

export default function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    },[])

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post = {post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}