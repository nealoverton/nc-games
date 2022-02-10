import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchUserByUsername, fetchReviews } from "../utils/game-reviews-api";
import { NotFound } from "./NotFound";
import { lastUrlContext } from "./Context";

export const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [userReviews, setUserReviews] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const { setLastUrl } = useContext(lastUrlContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLastUrl(window.location.pathname);
    fetchUserByUsername(username).then((res) => {
      if (!res.user) {
        setUserNotFound(true);
      }

      setUser(res.user);
      setIsLoading(false);
    });

    fetchReviews({ owner: username }).then((res) => {
      setUserReviews(res.total_count);
    });
  }, []);

  if (userNotFound) return <NotFound />;

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="User">
      <img src={user.avatar_url} className="User__img" />
      <h1>{user.username}</h1>
      <h3>{user.name}</h3>
      {userReviews ? (
        <Link to={`/users/${user.username}/reviews`} className="User__link">
          {userReviews} reviews
        </Link>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default User;
