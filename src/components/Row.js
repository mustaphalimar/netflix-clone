import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import { Link } from "react-router-dom";

const poster_base_url = "http://image.tmdb.org/t/p/w185";

function Row({ title, fetchUrl, netflixOriginals, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      const response = await request.data;
      setMovies(response.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => {
          return (
            <Link
              key={movie.id}
              className="row__link"
              to={`${
                netflixOriginals ? `/serie/${movie.id}` : `/movie/${movie.id}`
              }`}
            >
              <div className="row__movie" key={movie.id}>
                <div
                  className={`row__poster ${
                    isLargeRow ? "row__posterLarge" : ""
                  }`}
                  style={{
                    backgroundImage: `url( ${poster_base_url}${movie.poster_path})`,
                  }}
                ></div>
                <p className="row__title">
                  {movie.original_name
                    ? movie.original_name
                    : movie.original_title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
