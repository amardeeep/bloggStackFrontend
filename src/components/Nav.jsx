import { useNavigate } from "react-router-dom";
export default function Nav({ loggedIn, logOut }) {
  const navigate = useNavigate();
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
        {loggedIn && <button onClick={handleLogoutButton}>Log Out</button>}
        {loggedIn && <button>Profile</button>}
        {!loggedIn && <button onClick={handleLoginButton}>Log In</button>}
      </div>
    </nav>
  );
}
