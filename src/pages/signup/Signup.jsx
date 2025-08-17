import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [serverResponse, setServerResponse] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:3000/signup", {
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
        setServerResponse(response);
        console.log(`User created Succesfully`);
        navigate("/login");
      })
      .catch((error) => {
        setError(error);
      })
      .finally(setLoading(false));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">User Name (use Your email)</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          Signup
        </button>
        {error && <p>Error :{error.message}</p>}
        <p>{JSON.stringify(formData)}</p>
        <p>{JSON.stringify(serverResponse)}</p>
      </form>
    </>
  );
}
