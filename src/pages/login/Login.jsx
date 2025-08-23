import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  function handleChange(e) {
    //destructure name and value from e.target
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetch("http://localhost:3000/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http Error :${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log("Success!");
        console.log(JSON.stringify(response.data));
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      })
      .finally(setLoading(false));
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
          Log In
        </button>
        {error && <p>Error {error.status}</p>}
      </form>
    </>
  );
}
