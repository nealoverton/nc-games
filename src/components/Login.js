import { fetchUserByUsername } from "../utils/game-reviews-api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { profileContext } from "./ProfileContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const { setProfile } = useContext(profileContext);

  const attemptLogin = (event) => {
    event.preventDefault();

    if (username !== "") {
      fetchUserByUsername(username)
        .then((res) => {
          setProfile(res.user);
          setError(false);
          navigate("/");
        })
        .catch((err) => {
          setError(true);
        });
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <form onSubmit={attemptLogin} className="login">
      <label className="login__input">
        Username:
        <input type="text" name="username" onChange={handleChange}></input>
      </label>
      {error ? <p className="login__error">Invalid Username</p> : <></>}
      <button>Login</button>
    </form>
  );
};

export default Login;
