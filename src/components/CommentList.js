import { useEffect } from "react";
import { Comment } from "./Comment";

export const CommentList = ({ comments, setComments }) => {
  useEffect(() => {}, [comments]);

  return (
    <ul>
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment.comment_id}
            setComments={setComments}
          />
        );
      })}
    </ul>
  );
};
