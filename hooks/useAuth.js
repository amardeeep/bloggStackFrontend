import { useState } from "react";
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  //async login function that throws error on failed login and returns data on succesful login
  async function login(email, password) {
    let dataToSend = { email, password };
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error(`http error :${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setUser(data.data);
      return data;
    } catch (error) {
      setLoginError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setUser(null);
  }
  return { isLoggedIn, user, loginError, login, logout, loading };
}
export default useAuth;
