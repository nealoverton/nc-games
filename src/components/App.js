import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import ReviewList from "./ReviewList";
import { NotFound } from "./NotFound";
import User from "./User";
import { profileContext, lastUrlContext } from "./Context";
import { useState } from "react";
import Login from "./Login";
import { FullReview } from "./FullReview";
import { UserReviews } from "./UserReviews";

function App() {
  const [profile, setProfile] = useState();
  const [lastUrl, setLastUrl] = useState("/");

  return (
    <profileContext.Provider value={{ profile, setProfile }}>
      <lastUrlContext.Provider value={{ lastUrl, setLastUrl }}>
        <BrowserRouter>
          <div className="App">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reviews" element={<ReviewList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reviews/:review_id" element={<FullReview />} />
              <Route path="/users/:username" element={<User />} />
              <Route
                path="/users/:username/reviews"
                element={<UserReviews />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </lastUrlContext.Provider>
    </profileContext.Provider>
  );
}

export default App;
