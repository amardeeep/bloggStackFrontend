import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
export default function Nav() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, user, logout } = useContext(AuthContext);
  function handleLoginButton(e) {
    e.preventDefault();
    navigate("/login");
  }
  function handleLogoutButton(e) {
    e.preventDefault();
    logout();
  }
  return (
    <nav>
      <h2>BloggStack</h2>
      <div className="rightContainer">
        {isLoggedIn && <h2>Welcome Back {user.fullName}</h2>}
        {isAdmin && (
          <button
            onClick={() => {
              navigate("/admin");
            }}
          >
            Admin Dashboard
          </button>
        )}
        {isLoggedIn && <button onClick={handleLogoutButton}>Log Out</button>}
        {isLoggedIn && <button>Profile</button>}
        {!isLoggedIn && <button onClick={handleLoginButton}>Log In</button>}
      </div>
    </nav>
  );
}
