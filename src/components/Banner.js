import React from "react";
import "./Banner.css";
import { useHistory } from "react-router-dom";

const poster_base_url = "https://image.tmdb.org/t/p/original";

function Banner({ movie, clicked }) {
  const history = useHistory();
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const browseMovie = (id) => {
    history.push(`/serie/${id}`);
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${poster_base_url}${movie?.backdrop_path})`,
      }}
    >
      {!clicked ? (
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner__buttons">
            <button
              className="banner__button"
              onClick={() => browseMovie(movie.id)}
            >
              Play
            </button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">
            {movie?.overview && truncate(movie?.overview, 150)}
          </h1>
        </div>
      ) : (
        <div className="banner__contents"></div>
      )}
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
