import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Posts() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [popNewCommentForm, setPopNewCommentForm] = useState(false);
  const [loadingNewComment, setLoadingNewComment] = useState(false);
  const [errorNewComment, setErrorNewComment] = useState(null);
  const [newCommentBody, setNewCommentBody] = useState("");
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  function handlePopForm() {
    setPopNewCommentForm((prevValue) => !prevValue);
  }
  function handleNewComment(e) {
    e.preventDefault();
    setLoadingNewComment(true);
    fetch(`http://localhost:3000/comments/`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
        body: newCommentBody,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(`You need to login to create new comment.`);
          }
          throw new Error(`Http Error :${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => setErrorNewComment(error))
      .finally(setLoadingNewComment(false), setPopNewCommentForm(false));
  }
  function handleNewCommentChange(e) {
    const value = e.target.value;
    setNewCommentBody(value);
  }
  function Comment({ comment }) {
    return (
      <>
        <li key={comment.id}>{comment.body}</li>
      </>
    );
  }
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "get",
      headers: {
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
  }, [id]);
  return (
    <div className="postPage">
      {loading && <h1>Loading Post ...</h1>}
      {error && <h1>{error}</h1>}
      {post && (
        <>
          <button onClick={handleClick}>Go Back To Home</button>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>Likes : </p>
          <ul>
            <h3>
              Top Comments :
              {token && <button onClick={handlePopForm}>New Comment</button>}
            </h3>
            {popNewCommentForm && (
              <form>
                <input
                  type="text"
                  name="newComment"
                  id="newComment"
                  value={newCommentBody}
                  onChange={handleNewCommentChange}
                  required
                />
                {errorNewComment && <p>{error.message}</p>}
                <button onClick={handleNewComment} disabled={loadingNewComment}>
                  Create
                </button>
              </form>
            )}
            <ul>
              {post.comments.map((comment) => (
                <Comment comment={comment} key={comment.id}></Comment>
              ))}
            </ul>
          </ul>
        </>
      )}
    </div>
  );
}
