import "./Navbar.css";
import Logo from "../images/DLF_logo.svg";
const Navbar = () => {
  return (
    <>
      <nav>
        <div>
          <div className="navbar">
            <div className="navbar-left">
              <img className="logo" src={Logo} alt="" />
            </div>
            <div className="navbar-right">
              <a href="/">Home</a>
              <a href="#">About</a>
              <a href="#">Contact Us</a>
              <a href="#">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
