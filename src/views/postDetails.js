import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post"; // Importe o componente Post
import { useParams } from "react-router-dom"; // Importe o hook useParams do React Router

function PostsDetails() {
    const [post, setPost] = useState({});
    const { id } = useParams(); // Obtenha o 'id' da URL usando o hook useParams

    useEffect(() => {
        axios.get(`http://localhost:8081/api/posts/${id}`)
            .then((response) => {
                if (response.data && typeof response.data === 'object') {
                    console.log(response.data.postsWithBase64Images);
                    setPost(response.data.postsWithBase64Images);
                } else {
                    console.error("Resposta inválida da API:", response);
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar os posts:", error);
            });
    }, [id]); // Certifique-se de incluir 'id' como uma dependência

    return (
        <div>
            <Post
                id={post.id}
                title={post.title}
                content={post.content}
                likes={post.likes}
                image={`data:image/jpeg;base64,${post.photo}`}
                date={post.createdAt}
            />
        </div>
    );
}

export default PostsDetails;
