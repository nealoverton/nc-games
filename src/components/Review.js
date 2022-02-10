import { useEffect, useState } from "react";
import DetectableOverflow from "react-detectable-overflow";
import { gaugeReaction, formatDate } from "../utils/formatting";
import {
  fetchReviewByID,
  fetchReviews,
  fetchUserByUsername,
} from "../utils/game-reviews-api";
import { UserSnippet } from "./UserSnippet";
import { useNavigate } from "react-router-dom";

export const Review = ({ review_id, isFullReview = false, votes }) => {
  const [review, setReview] = useState({});
  const [user, setUser] = useState({});
  const [userReviews, setUserReviews] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(isFullReview);
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchReviewByID(review_id).then((res) => {
      setReview(res.review);
      setDate(formatDate(res.review.created_at));
      setIsLoading(false);

      fetchUserByUsername(res.review.owner).then((res) => {
        setUser(res.user);
      });

      fetchReviews(null, res.review.owner).then((res) => {
        setUserReviews(res.total_count);
      });
    });
  }, [votes]);

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
      <h2 className="Review__title">{review.title}</h2>
      <h3 className="Review__category">{review.category}</h3>
      <p>{votes} votes</p>

      <div className="Review__user-details">
        <UserSnippet user={user} />
      </div>

      <p className="Review__date">posted {date}</p>
      <div
        className={
          isExpanded ? "Review__body--expanded" : "Review__body--collapsed"
        }
      >
        <p>{review.review_body}</p>
      </div>

      {isFullReview ? (
        <></>
      ) : (
        <div
          className="Review__footer"
          onClick={() => navigate(`/reviews/${review.review_id}`)}
        >
          <p
            className={isExpanded ? "hidden" : "Review__read-more"}
            onClick={expandReview}
          >
            read more
          </p>
          <p>{review.comment_count} comments</p>
        </div>
      )}
    </div>
  );
};

export default Review;
