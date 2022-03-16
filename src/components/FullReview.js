import { useParams, useNavigate } from "react-router-dom";
import Review from "./ReviewSnippet";
import {
  fetchCommentsbyReviewID,
  fetchReviewByID,
  patchReview,
  postComment,
  updateVotes,
} from "../utils/game-reviews-api";
import { useEffect, useState, useContext } from "react";
import { Comment } from "./Comment";
import { profileContext, lastUrlContext } from "./Context";
import { CommentList } from "./CommentList";

export const FullReview = () => {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const { profile, setProfile } = useContext(profileContext);
  const { setLastUrl } = useContext(lastUrlContext);
  const [votes, setVotes] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    setLastUrl(window.location.pathname);
    fetchReviewByID(review_id)
      .then((res) => {
        setVotes(res.review.votes);
      })
      .catch((err) => {
        navigate("/404");
      });

    fetchCommentsbyReviewID(review_id).then((res) => {
      setComments(res.comments);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newComment !== "") {
      postComment(review_id, profile.username, newComment).then(() => {
        setNewComment("");
        fetchCommentsbyReviewID(review_id).then((res) => {
          setComments(res.comments);
          setIsLoading(false);
        });
      });
    }
  };

  const handleVoting = (inc_votes) => {
    setVotes((currentVotes) => currentVotes + inc_votes);
    updateVotes(review_id, inc_votes, "reviews");
  };

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="FullReview">
      <Review review_id={review_id} isFullReview={true} votes={votes} />
      {profile ? (
        <div className="Review__footer__voting">
          <p>Do you agree?</p>
          <div className="Review__voting__buttons">
            <button
              className="Review__voting__button"
              onClick={() => handleVoting(1)}
            >
              <img
                src={require("../media/thumbs-up.png")}
                className="Review__voting__button__img--up"
              />
            </button>
            <button
              className="Review__voting__button"
              onClick={() => handleVoting(-1)}
            >
              <img
                src={require("../media/thumbs-down.png")}
                className="Review__voting__button__img--down"
              />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {profile ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={handleChange}
          />
          <button>post</button>
        </form>
      ) : (
        <p>Log in to leave a comment</p>
      )}
      <CommentList comments={comments} setComments={setComments} />
    </div>
  );
};
