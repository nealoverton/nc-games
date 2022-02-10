import { useEffect, useState, useContext } from "react";
import { deleteComment, fetchUserByUsername } from "../utils/game-reviews-api";
import { UserSnippet } from "./UserSnippet";
import { formatDate } from "../utils/formatting";
import { profileContext } from "./Context";
import "./Comment.css";

export const Comment = ({ comment, setComments }) => {
  const [user, setUser] = useState({});
  const [isloading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");
  const { profile, setProfile } = useContext(profileContext);

  useEffect(() => {
    setDate(formatDate(comment.created_at));
    fetchUserByUsername(comment.author).then((res) => {
      setUser(res.user);

      setIsLoading(false);
    });
  }, []);

  const handleDelete = () => {
    deleteComment(comment.comment_id);
    setComments((currentComments) => {
      const newComments = [];

      for (const currentComment of currentComments) {
        if (currentComment.comment_id !== comment.comment_id) {
          newComments.push(currentComment);
        }
      }

      setComments(newComments);
    });
  };

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="Comment">
      <UserSnippet user={user} />
      <p className="Review__date">posted {date}</p>
      <p className="Comment__body">{comment.body}</p>
      {profile && profile.username === comment.author ? (
        <button onClick={handleDelete}>delete</button>
      ) : (
        <></>
      )}
    </div>
  );
};
