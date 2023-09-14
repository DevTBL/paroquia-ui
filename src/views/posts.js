import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post"; // Importe o componente Post

function PostsList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/api/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar os posts:", error);
            });
    }, []);

    return (
        
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    likes={post.likes}
                    image={`data:image/jpeg;base64,${post.photo}`}
                    date={post.createdAt}
                />
            ))}
        </div>
    );
}

export default PostsList;
