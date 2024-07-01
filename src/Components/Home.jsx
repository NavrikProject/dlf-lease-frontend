import "./Home.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import FileSelect from "./FileSelect";
const Home = () => {
  return (
    <section className="homeSection">
      <Navbar />
      <FileSelect />
      <Footer />
    </section>
  );
};

export default Home;
