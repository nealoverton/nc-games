import { useParams } from "react-router-dom";
import Review from "./Review";
import {
  fetchCommentsbyReviewID,
  postComment,
} from "../utils/game-reviews-api";
import { useEffect, useState, useContext } from "react";
import { Comment } from "./Comment";
import { profileContext } from "./ProfileContext";

export const FullReview = () => {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const { profile, setProfile } = useContext(profileContext);
  const [tempSwitch, setTempSwitch] = useState(true);

  useEffect(() => {
    fetchCommentsbyReviewID(review_id).then((res) => {
      setComments(res.comments);
      setIsLoading(false);
    });
  }, [tempSwitch]);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newComment !== "") {
      postComment(review_id, profile.username, newComment).then(() => {
        setNewComment("");
        setTempSwitch(!tempSwitch);
      });
    }
  };

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="FullReview">
      <Review review_id={review_id} isFullReview={true} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleChange}
        />
        <button>post</button>
      </form>
      <ul>
        {comments.map((comment) => {
          return <Comment comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </div>
  );
};
