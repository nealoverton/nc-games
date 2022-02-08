import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchReviewsByCategory } from "../utils/game-reviews-api";
import Review from "./Review";

export const ReviewList = () => {
  const { category, owner } = useSearchParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviewsByCategory(category).then((res) => {
      setReviews(res);
    });
  }, [category]);

  return (
    <ul className="review-list">
      {reviews.map((review) => {
        return (
          <li key={review.review_id} className="review-list__li">
            <Review review_id={review.review_id} />
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
