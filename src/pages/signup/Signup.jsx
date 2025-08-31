import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
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
    //form validation goes here
    if (confirmPasswordValue !== formData.password) {
      throw new Error("Confirm Password should be same as passowrd");
    }
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
      .then(() => {
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
      <h2>
        Already have an account? Sign in <Link to={"/login"}>here</Link>{" "}
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">User Name </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Jhon Doe"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Your Password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm You Password"
          onChange={(e) => {
            setConfirmPasswordValue(e.target.value);
          }}
          value={confirmPasswordValue}
        />
        <button type="submit" disabled={loading}>
          Signup
        </button>
        {/*handle error and validate formData before sending request  */}
        {error && <p>Error :{error.message}</p>}
      </form>
    </>
  );
}
