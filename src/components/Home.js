import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "react-select";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div className="Home">
      <p className="Home__welcome">Welcome to Table Hog, </p>
      <button onClick={() => navigate("/reviews")}>Get started</button>
      <Link to="/reviews">Get started</Link>
    </div>
  );
};

export default Home;
