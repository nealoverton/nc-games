import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://boardgame-reviews.herokuapp.com/api",
});

export const fetchReviews = (queries) => {
  const url = "/reviews";

  return gamesApi.get(url, { params: queries }).then((res) => {
    return res.data;
  });
};

export const fetchReviewByID = (review_id) => {
  const url = `/reviews/${review_id}`;
  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};

export const patchReview = (review_id, inc_votes) => {
  const url = `/reviews/${review_id}`;

  return gamesApi.patch(url, { inc_votes }).then((res) => {
    return res.data;
  });
};

export const fetchCommentsbyReviewID = (review_id) => {
  const url = `/reviews/${review_id}/comments`;

  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};

export const postComment = (review_id, username, body) => {
  const url = `/reviews/${review_id}/comments`;

  return gamesApi.post(url, { username: username, body: body }).then((res) => {
    return res.data;
  });
};

export const deleteComment = (comment_id) => {
  const url = `/comments/${comment_id}`;

  return gamesApi.delete(url);
};

export const fetchUserByUsername = (username) => {
  const url = `/users/${username}`;
  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};

export const fetchCategories = () => {
  const url = `/categories`;

  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};
