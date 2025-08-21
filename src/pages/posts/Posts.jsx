import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Posts() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http Error :${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(setLoading(false));
  }, [token, id]);
  return (
    <div className="postPage">
      {loading && <h1>Loading Post ...</h1>}
      {error && <h1>{error}</h1>}
      {post && (
        <>
          <button onClick={handleClick}>Go Back To Home</button>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </>
      )}
    </div>
  );
}
