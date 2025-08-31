import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function PostBlock({ post }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/posts/${post.id}`);
  }
  return (
    <div onClick={handleClick}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h4>{post.author.fullName}</h4>
      <h5>{post.createdAt}</h5>
    </div>
  );
}
function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  //fetch all posts and render them on homepage
  useEffect(() => {
    setLoading(true);
    setPosts(null);
    fetch("http://localhost:3000/posts", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`http error : ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, []);

  return (
    <>
      <Nav />
      <h1>Posts will be displayed here</h1>
      {loading && <h2>Loading Posts ...</h2>}
      {error && <h2>{error.message}</h2>}
      {posts &&
        posts.map((post) => <PostBlock key={post.id} post={post}></PostBlock>)}
      <Footer />
    </>
  );
}
export default Home;
