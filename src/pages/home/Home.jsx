import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

function Home({ userId }) {
  return (
    <>
      <Nav />
      <h1>Hello From Home {userId}</h1>
      <Footer />
    </>
  );
}
export default Home;
