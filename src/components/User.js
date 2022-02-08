import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchUserByUsername } from "../utils/game-reviews-api";
import { NotFound } from "./NotFound";

export const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    fetchUserByUsername(username).then((res) => {
      if (!res.user) {
        setUserNotFound(true);
      }

      setUser(res.user);
      setIsLoading(false);
    });
  }, []);

  if (userNotFound) return <NotFound />;

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <img src={user.avatar_url} />
      <h1>{user.username}</h1>
      <h2>{user.name}</h2>
      <Link to={`/reviews?owner=${username}`}>reviews</Link>
    </div>
  );
};

export default User;
