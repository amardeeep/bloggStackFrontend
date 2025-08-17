import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  function handleChange(e) {
    //destructure name and value from e.target
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    setLoading(true);
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
        setData(response);
        console.log(data);
      })
      .catch((error) => setError(error))
      .finally(setLoading(false));
    //submit login credentials, if login fails return error else navigate to homepage, create token and store it in localstorage
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
        />
        <label htmlFor="password">Passowrd :</label>
        <input
          type="password"
          name="password"
          id="passowrd"
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit" onClick={handleSubmit} disabled={loading}>
          Log In
        </button>
        {error && <p>Error {error.message}</p>}
      </form>
    </>
  );
}
