import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { profileContext } from "./Context";
import { useContext, useEffect } from "react";

export const Nav = () => {
  const { profile, setProfile } = useContext(profileContext);

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
          onClick={() => navigate(`/users/${profile.username}`)}
        />
        <button onClick={logout}>Logout</button>
        {/* <img src={require("../hamburger.png")} className="Nav__hamburger" /> */}
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
          src={require("../logo.png")}
          className="Nav__logo"
          alt="Black die icon"
        />
        <h1>Table Hog</h1>
      </Link>
      {profile ? loggedInAs : loginLink}
    </nav>
  );
};

export default Nav;
