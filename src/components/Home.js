import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1 className="home__title">Unlimited movies, TV shows, and more.</h1>
      <h2 className="home__subtitle">Watch anywhere. Cancel anytime.</h2>
      <h3 className="home__paragraph">
        Ready to watch? Enter your email to create or restart your membership.
      </h3>
      <div className="home__input">
        <input
          type="text"
          className="home__inputField"
          placeholder="Email Address"
        />
        <button className="home__button">Get Started</button>
      </div>
    </div>
  );
}

export default Home;
