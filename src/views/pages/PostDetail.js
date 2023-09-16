import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/Post";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom"; // Importe o hook useParams

function PostDetail() {
  const { id } = useParams(); // Use o hook useParams para obter o parâmetro da rota 'id'

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/posts/${id}`)
      .then((response) => {
        if (response.data && typeof response.data === 'object') {
          setPost(response.data.postsWithBase64Images);
        } else {
          console.error("Resposta inválida da API:", response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os posts:", error);
        setLoading(false);
      });
  }, [id]); // Certifique-se de incluir 'id' como uma dependência

  if (loading) {
    return <Loader />;
  }

  if (!post) {
    return <div>Dados não encontrados.</div>;
  }

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

export default PostDetail;
