import { useEffect, useState } from "react";
import { fetchUserByUsername } from "../utils/game-reviews-api";
import { UserSnippet } from "./UserSnippet";
import { formatDate } from "../utils/formatting";

export const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  const [isloading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(formatDate(comment.created_at));
    fetchUserByUsername(comment.author).then((res) => {
      setUser(res.user);

      setIsLoading(false);
    });
  }, []);

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="Comment">
      <UserSnippet user={user} />
      <p className="Review__date">posted {date}</p>
      <p>{comment.body}</p>
    </div>
  );
};
