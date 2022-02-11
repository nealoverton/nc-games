import { useEffect, useState, useContext } from "react";
import {
  deleteComment,
  fetchUserByUsername,
  patchComment,
} from "../utils/game-reviews-api";
import { UserSnippet } from "./UserSnippet";
import { formatDate } from "../utils/formatting";
import { profileContext } from "./Context";
import "./Comment.css";

export const Comment = ({ comment, setComments }) => {
  const [user, setUser] = useState({});
  const [isloading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");
  const { profile, setProfile } = useContext(profileContext);
  const [votes, setVotes] = useState(comment.votes);

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

  const handleVoting = (inc_votes) => {
    setVotes((currentVotes) => currentVotes + inc_votes);
    patchComment(comment.comment_id, inc_votes);
  };

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="Comment">
      <UserSnippet user={user} />
      <p className="Review__date">posted {date}</p>
      <p className="Comment__body">{comment.body}</p>

      {profile ? (
        <div className="Review__footer__voting">
          <div className="Review__voting__buttons">
            <button
              className="Review__voting__button"
              onClick={() => handleVoting(1)}
            >
              <img
                src={require("../thumbs-up.png")}
                className="Review__voting__button__img--up"
              />
            </button>
            <p>{votes} votes</p>
            <button
              className="Review__voting__button"
              onClick={() => handleVoting(-1)}
            >
              <img
                src={require("../thumbs-down.png")}
                className="Review__voting__button__img--down"
              />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {profile && profile.username === comment.author ? (
        <button onClick={handleDelete}>delete</button>
      ) : (
        <></>
      )}
    </div>
  );
};
