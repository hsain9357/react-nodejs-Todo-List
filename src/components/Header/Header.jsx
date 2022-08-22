import "./Header.css";
import Logo from "../../asssets/R.svg";
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <nav className="nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link login">
              Login <span></span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
