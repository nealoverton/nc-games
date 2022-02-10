import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lastUrlContext } from "./Context";
import { fetchCategories, fetchReviews } from "../utils/game-reviews-api";
import ReviewList from "./ReviewList";

export const UserReviews = ({ owner }) => {
  const [page, setPage] = useState(1);
  const { username } = useParams();

  return (
    <div>
      <h2>{username}'s reviews</h2>

      <ReviewList owner={username} page={page} setPage={setPage} />
    </div>
  );
};
