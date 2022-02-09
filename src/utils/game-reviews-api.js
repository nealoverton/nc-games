import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://boardgame-reviews.herokuapp.com/api",
});

export const fetchReviews = (category, owner, p, limit) => {
  let url = "/reviews";
  const queries = [];

  if (category) queries.push(`category=${category}`);
  if (owner) queries.push(`owner=${owner}`);
  if (p) queries.push(`p=${p}`);
  if (limit) queries.push(`limit=${limit}`);
  url += "?" + queries.join("&&");

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
