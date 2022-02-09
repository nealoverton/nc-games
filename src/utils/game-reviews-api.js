import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://boardgame-reviews.herokuapp.com/api",
});

export const fetchReviews = (queries) => {
  let url = "/reviews";
  const queryStrings = [];

  for (const query in queries) {
    if (queries[query]) {
      queryStrings.push(`${query}=${queries[query]}`);
    }
  }

  url += "?" + queryStrings.join("&&");

  return gamesApi.get(url).then((res) => {
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

  console.log({ username: username, body: body });

  return gamesApi.post(url, { username: username, body: body }).then((res) => {
    return res.data;
  });
};

export const fetchReviewByID = (review_id) => {
  let url = `/reviews/${review_id}`;
  return gamesApi.get(url).then((res) => {
    return res.data;
  });
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
