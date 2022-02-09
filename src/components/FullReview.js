import { useParams } from "react-router-dom";
import Review from "./Review";
import { fetchCommentsbyReviewID } from "../utils/game-reviews-api";
import { useEffect, useState } from "react";
import { Comment } from "./Comment";

export const FullReview = () => {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCommentsbyReviewID(review_id).then((res) => {
      setComments(res.comments);
      setIsLoading(false);
    });
  }, []);

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <Review review_id={review_id} isFullReview={true} />
      <ul>
        {comments.map((comment) => {
          return <Comment comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </div>
  );
};
