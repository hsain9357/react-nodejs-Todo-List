import { ReactSVG } from "react-svg";
import "./Header.css";
import Logo from "../../asssets/R.svg";
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <ReactSVG src={Logo} />
      </div>
      <nav className="nav">
        <ul className="navbar_nav">
          <li className="nav_item">
            <a href="#" className="nav_link">
              Contact
            </a>
          </li>
          <li className="nav_item">
            <a href="#" className="nav_link">
              About
            </a>
          </li>
          <li className="nav_item">
            <a href="#" className="nav_link login">
              Login <span></span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
