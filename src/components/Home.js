import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <p>Welcome!</p>
      <Link to="/reviews">reviews</Link>
    </div>
  );
};

export default Home;
