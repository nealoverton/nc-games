import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://boardgame-reviews.herokuapp.com/api",
});

export const fetchReviewsByCategory = (category) => {
  let url = "/reviews";
  if (category) url += `?category=${category}`;
  return gamesApi.get(url).then((res) => {
    return res.data.reviews;
  });
};

export const fetchReviewsByOwner = (owner) => {
  let url = "/reviews";
  if (owner) url += `?owner=${owner}`;
  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};

export const fetchReviewByID = (review_id) => {
  let url = `/reviews/${review_id}`;
  return gamesApi.get(url).then((res) => {
    return res.data.review;
  });
};

export const fetchUserByUsername = (username) => {
  let url = `/users/${username}`;
  return gamesApi.get(url).then((res) => {
    return res.data.user;
  });
};
