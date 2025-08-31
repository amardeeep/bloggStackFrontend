import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import { useContext } from "react";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loginError, loading } = useContext(AuthContext);
  function handleChange(e) {
    //destructure name and value from e.target
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h2>
        Don't have an account? Sign up <Link to={"/signup"}>here.</Link>
      </h2>
      <form>
        <label htmlFor="email">User Name :</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
          required
          placeholder="your@email.com"
        />
        <label htmlFor="password">Passowrd :</label>
        <input
          type="password"
          name="password"
          id="passowrd"
          onChange={handleChange}
          value={formData.password}
          placeholder="Enter Your Password"
          required
        />
        <button type="submit" onClick={handleSubmit} disabled={loading}>
          Login
        </button>
        {loginError && <p>Error {loginError.status}</p>}
      </form>
    </>
  );
}
