import React, {useState, useEffect} from "react";
import { Container, PostForm , PostCard} from "..";
import service from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost(){
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            service.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[navigate, slug])

    return posts ? (
        <div className="py-8">
            <container>
                <PostForm post={posts} />
            </container>
        </div>
    ) : null;
}