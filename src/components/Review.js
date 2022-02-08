import { useEffect, useState } from "react";
import DetectableOverflow from "react-detectable-overflow";
import { gaugeReaction, formatDate } from "../utils/formatting";
import {
  fetchReviewByID,
  fetchReviewsByOwner,
  fetchUserByUsername,
} from "../utils/game-reviews-api";

export const Review = ({ review_id }) => {
  const [review, setReview] = useState({});
  const [user, setUser] = useState({});
  const [userReviews, setUserReviews] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchReviewByID(review_id).then((res) => {
      setReview(res);
      setDate(formatDate(res.created_at));
      setIsLoading(false);

      fetchUserByUsername(res.owner).then((res) => {
        setUser(res);
      });

      fetchReviewsByOwner(res.owner).then((res) => {
        setUserReviews(res.total_count);
      });
    });
  }, []);

  const expandReview = () => {
    setIsExpanded(true);
  };

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="Review">
      <img
        src={review.review_img_url}
        className="Review__img"
        alt="A review image chosen by the author"
      />
      <h2>{review.title}</h2>
      <p>{gaugeReaction(review.votes)}</p>

      <div className="Review__user-details">
        <img
          src={user.avatar_url}
          className="Review__user-details__img"
          alt="The review author's profile picture"
        />
        <p className="Review__user-details__name">{user.username}</p>
        <p>|</p>
        <p>{userReviews} reviews</p>
      </div>

      <p>posted {date}</p>
      <div
        className={
          isExpanded ? "Review__body--expanded" : "Review__body--collapsed"
        }
      >
        <p>{review.review_body}</p>
      </div>

      <p
        className={isExpanded ? "hidden" : "Review__read-more"}
        onClick={expandReview}
      >
        read more
      </p>
      <div className="Review__voting">
        <button>&#128077;</button>
        <p>Do you agree?</p>
        <button>&#128078;</button>
      </div>

      <p>{review.comment_count} comments</p>
    </div>
  );
};

export default Review;
