import { Link, useNavigate } from "react-router-dom";
import { profileContext } from "./ProfileContext";
import { useContext } from "react";

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
    navigate("/");
  };

  if (profile) {
    loggedInAs = (
      <div className="Nav__profile">
        <img
          src={profile.avatar_url}
          className="Nav__profile__img"
          onClick={() => navigate(`/users/${profile.username}`)}
        />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <nav className="sticky gradient">
      <Link to="/" className="Nav__home-link">
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
