import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <form>
        <label htmlFor="email">User Name :</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <label htmlFor="password">Passowrd :</label>
        <input
          type="password"
          name="password"
          id="passowrd"
          onChange={handleChange}
          value={formData.password}
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
