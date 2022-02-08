import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <Link to="/" className="nav__home-link">
        <img
          src={require("../die-logo-512.png")}
          className="nav__logo"
          alt="Black die icon"
        />
        <h1>NC Games</h1>
      </Link>
      <p>Log in</p>
    </nav>
  );
};

export default Nav;
