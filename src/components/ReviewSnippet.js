import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatting";
import {
  fetchReviewByID,
  fetchUserByUsername,
} from "../utils/game-reviews-api";
import { UserSnippet } from "./UserSnippet";
import { useNavigate } from "react-router-dom";
import "./ReviewSnippet.css";

export const Review = ({ review_id, isFullReview = false, votes }) => {
  const [review, setReview] = useState({});
  const [user, setUser] = useState({});
  const [isloading, setIsLoading] = useState(true);
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
    });
  }, [votes, review_id]);

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="Review">
      <img
        src={review.review_img_url}
        className="Review__img"
        alt="A review image chosen by the author"
        onClick={() => navigate(`/reviews/${review.review_id}`)}
      />
      <h2
        className="Review__title"
        onClick={() => navigate(`/reviews/${review.review_id}`)}
      >
        {review.title}
      </h2>
      <h3 className="Review__category">{review.category}</h3>
      <p>{votes} votes</p>

      <div className="Review__user-details">
        <UserSnippet user={user} />
      </div>

      <p className="Review__date">posted {date}</p>
      <div
        className={
          isFullReview ? "Review__body--expanded" : "Review__body--collapsed"
        }
      >
        <p onClick={() => navigate(`/reviews/${review.review_id}`)}>
          {review.review_body}
        </p>
      </div>

      {isFullReview ? (
        <></>
      ) : (
        <p
          className="Review__footer"
          onClick={() => navigate(`/reviews/${review.review_id}`)}
        >
          {review.comment_count} comments
        </p>
      )}
    </div>
  );
};

export default Review;
