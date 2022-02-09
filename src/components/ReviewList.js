import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { fetchCategories, fetchReviews } from "../utils/game-reviews-api";
import Review from "./Review";

export const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageRange, setPageRange] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const sortByOptions = [
    {
      value: "created_at",
      label: "newest",
    },
    {
      value: "comment_count",
      label: "most commented",
    },
    {
      value: "votes",
      label: "popularity",
    },
  ];
  const [selectedSortBy, setSelectedSortBy] = useState();

  useEffect(() => {
    fetchCategories().then((res) => {
      const all = [{ value: null, label: "all" }];
      const categoryOptions = res.categories.map((category) => {
        return {
          value: category.slug,
          label: category.slug,
        };
      });
      setCategories(all.concat(categoryOptions));
    });
  }, []);

  useEffect(() => {
    fetchReviews(selectedCategory, null, page).then((res) => {
      setReviews(res.reviews);
      const pageTotal = Math.ceil(res.total_count / 10);
      const arraySpread = [...Array(pageTotal).keys()];
      const pageSpread = arraySpread.map((index) => index + 1);
      setPageRange(pageSpread);
      window.scrollTo(0, 0);
    });
  }, [selectedCategory, page]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  const handleSortByChange = (selectedOption) => {
    setSelectedSortBy(selectedOption.value);
  };

  return (
    <div>
      <label>
        Category:
        <Select options={categories} onChange={handleCategoryChange} />
      </label>

      <label>
        Sort by:
        <Select options={sortByOptions} onChange={handleSortByChange} />
      </label>

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
