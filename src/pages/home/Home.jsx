import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { useState } from "react";
function Home() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  function logOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }
  return (
    <>
      <Nav loggedIn={loggedIn} logOut={logOut} />
      <h1>Posts will be displayed here</h1>
      <Footer />
    </>
  );
}
export default Home;
