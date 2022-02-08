import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchReviewsByCategory } from "../utils/game-reviews-api";
import Review from "./Review";

export const ReviewList = () => {
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageRange, setPageRange] = useState([]);

  useEffect(() => {
    fetchReviewsByCategory(
      searchParams.get("category"),
      searchParams.get("owner"),
      page
    ).then((res) => {
      setReviews(res.reviews);
      const pageTotal = Math.ceil(res.total_count / 10);
      const arraySpread = [...Array(pageTotal).keys()];
      const pageSpread = arraySpread.map((index) => index + 1);
      setPageRange(pageSpread);
      window.scrollTo(0, 0);
    });
  }, [searchParams, page]);

  return (
    <div>
      {searchParams.get("owner") ? }
      <ul className="ReviewList">
        {reviews.map((review) => {
          return (
            <li key={review.review_id} className="ReviewList__li">
              <Review review_id={review.review_id} />
            </li>
          );
        })}
      </ul>
      <div className="ReviewList__page-selection">
        {pageRange.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => {
                setPage(pageNumber);
              }}
              className={
                pageNumber === page
                  ? "ReviewList__page-button--selected"
                  : "ReviewList__page-button"
              }
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewList;
