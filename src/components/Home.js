import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { lastUrlContext } from "./Context";
import { fetchCategories, fetchReviews } from "../utils/game-reviews-api";
import ReviewList from "./ReviewList";

export const Home = () => {
  const [isloading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageRange, setPageRange] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const sortByOptions = ["created_at", "comment_count", "votes"];
  const [selectedSortBy, setSelectedSortBy] = useState();
  const { setLastUrl } = useContext(lastUrlContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLastUrl(window.location.pathname);
    fetchCategories().then((res) => {
      setCategories(res.categories);
      setIsLoading(false);
    });
  }, []);

  const handleCategoryChange = (event) => {
    setPage(1);
    if (event.target.value === "all") {
      setSelectedCategory();
    } else {
      setSelectedCategory(event.target.value);
    }
  };

  const handleSortByChange = (event) => {
    setPage(1);
    setSelectedSortBy(event.target.value);
  };

  return (
    <div className="Home">
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
      <ReviewList
        category={selectedCategory}
        sort_by={selectedSortBy}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Home;
