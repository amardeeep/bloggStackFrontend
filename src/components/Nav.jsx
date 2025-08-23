import { useNavigate } from "react-router-dom";
export default function Nav({ loggedIn, logOut }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  let parsed = null;
  try {
    parsed = JSON.parse(user);
  } catch (error) {
    throw new Error(error.message);
  }
  function handleLoginButton(e) {
    e.preventDefault();
    navigate("/login");
  }
  function handleLogoutButton(e) {
    e.preventDefault();
    logOut();
  }
  return (
    <nav>
      <h2>BloggStack</h2>
      <div className="rightContainer">
        {loggedIn && <h2>Welcome Back {parsed.fullName}</h2>}
        {loggedIn && <button onClick={handleLogoutButton}>Log Out</button>}
        {loggedIn && <button>Profile</button>}
        {!loggedIn && <button onClick={handleLoginButton}>Log In</button>}
      </div>
    </nav>
  );
}
