import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategories, fetchReviews } from "../utils/game-reviews-api";
import Review from "./ReviewSnippet";
import { lastUrlContext } from "./Context";

export const ReviewList = ({ category, sort_by, owner, page, setPage }) => {
  const [isloading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [pageRange, setPageRange] = useState([]);
  const { setLastUrl } = useContext(lastUrlContext);

  useEffect(() => {
    setLastUrl(window.location.pathname);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews({
      category: category,
      p: page,
      sort_by: sort_by,
      owner: owner,
    }).then((res) => {
      setReviews(res.reviews);
      const pageTotal = Math.ceil(res.total_count / 10);
      const arraySpread = [...Array(pageTotal).keys()];
      const pageSpread = arraySpread.map((index) => index + 1);
      setPageRange(pageSpread);
      window.scrollTo(0, 0);
    });
  }, [category, sort_by, owner, page]);

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div>
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

      <ul className="ReviewList">
        {reviews.map((review) => {
          return (
            <li key={review.review_id} className="ReviewList__li">
              <Review review_id={review.review_id} votes={review.votes} />
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
