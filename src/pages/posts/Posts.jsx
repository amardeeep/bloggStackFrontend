import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import { AuthContext } from "../../../AuthContext";
import { useContext } from "react";
export default function Posts() {
  const { id } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
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
    setErrorNewComment(null);
  }

  function handleNewComment(e) {
    e.preventDefault();
    if (newCommentBody === "") {
      setErrorNewComment("Empty comments not allowed.");
      return;
    }
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
        setRefreshTrigger((prev) => prev + 1);
      })
      .catch((error) => setErrorNewComment(error))
      .finally(
        setLoadingNewComment(false),
        setPopNewCommentForm(false),
        setNewCommentBody("")
      );
  }
  function handleNewCommentChange(e) {
    const value = e.target.value;
    setNewCommentBody(value);
  }
  function Comment({ comment }) {
    return (
      <>
        <li key={comment.id}>
          <h4>{comment.body}</h4>
          <h5>{comment.user.fullName}</h5>
        </li>
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
  }, [id, refreshTrigger]);
  return (
    <div className="postPage">
      {loading && <h1>Loading Post ...</h1>}
      {error && <h1>{error}</h1>}
      {post && (
        <>
          <Nav></Nav>
          <button onClick={handleClick}>Go Back To Home</button>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>Likes : </p>
          <ul>
            <h3>
              Top Comments :
              {isLoggedIn && (
                <button onClick={handlePopForm}>New Comment</button>
              )}
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
                {errorNewComment && <p>{errorNewComment}</p>}
                <button onClick={handleNewComment} disabled={loadingNewComment}>
                  Create
                </button>
                <button onClick={() => setPopNewCommentForm(false)}>
                  Cancel
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
