import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { profileContext } from "./Context";
import { useContext, useEffect, useState } from "react";

export const Nav = () => {
  const { profile, setProfile } = useContext(profileContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let loggedInAs = <p></p>;
  const loginLink = (
    <Link to="/login" className="Nav__login">
      <p>Log in</p>
    </Link>
  );
  const navigate = useNavigate();

  const logout = () => {
    setProfile();
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setProfile(foundUser);
    }
  }, []);

  if (profile) {
    loggedInAs = (
      <div className="Nav__profile">
        <img
          src={profile.avatar_url}
          className="Nav__profile__img"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        <div
          className={dropdownOpen ? "Nav__dropdown" : "Nav__dropdown hidden"}
        >
          <Link
            to={`/users/${profile.username}`}
            onClick={() => setDropdownOpen(false)}
          >
            My profile
          </Link>
          <Link to={"/reviews/new"} onClick={() => setDropdownOpen(false)}>
            Post a review
          </Link>
          <Link to={`/`} onClick={logout}>
            Log out
          </Link>
        </div>
      </div>
    );
  }

  return (
    <nav className="sticky gradient">
      <Link
        to="/"
        className="Nav__home-link"
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          src={require("../media/logo.png")}
          className="Nav__logo"
          alt="Black die icon"
        />
        <h1>Tablehog</h1>
      </Link>
      {profile ? loggedInAs : loginLink}
    </nav>
  );
};

export default Nav;
