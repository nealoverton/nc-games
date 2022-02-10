import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategories, fetchReviews } from "../utils/game-reviews-api";
import Review from "./Review";
import { lastUrlContext } from "./Context";

export const ReviewList = () => {
  const [isloading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageRange, setPageRange] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const sortByOptions = ["created_at", "comment_count", "votes"];
  const [selectedSortBy, setSelectedSortBy] = useState();
  const { setLastUrl } = useContext(lastUrlContext);

  useEffect(() => {
    setLastUrl(window.location.pathname);
    fetchCategories().then((res) => {
      setCategories(res.categories);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchReviews({
      category: selectedCategory,
      p: page,
      sort_by: selectedSortBy,
    }).then((res) => {
      setReviews(res.reviews);
      const pageTotal = Math.ceil(res.total_count / 10);
      const arraySpread = [...Array(pageTotal).keys()];
      const pageSpread = arraySpread.map((index) => index + 1);
      setPageRange(pageSpread);
      window.scrollTo(0, 0);
    });
  }, [selectedCategory, selectedSortBy, page]);

  const handleCategoryChange = (event) => {
    if (event.target.value === "all") {
      setSelectedCategory();
    } else {
      setSelectedCategory(event.target.value);
    }
  };

  const handleSortByChange = (event) => {
    setSelectedSortBy(event.target.value);
  };

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="ReviewList__selectors">
        <label>
          Category:
          <select onChange={handleCategoryChange} className="select">
            <option value={"all"}>all</option>
            {categories.map((category) => {
              return (
                <option value={category.slug} key={category.slug}>
                  {category.slug}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Sort by:
          <select onChange={handleSortByChange} className="select">
            <option value="created_at">newest</option>
            <option value="comment_count">most comments</option>
            <option value="votes">most popular</option>
          </select>
        </label>
      </div>

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
