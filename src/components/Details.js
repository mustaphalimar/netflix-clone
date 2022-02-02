import React, { useEffect, useState } from "react";
import "./Details.css";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "../axios";
import { db, auth } from "../firebase";

const API_KEY = "4a341142e78c862528cf762bbd7b17c9";
const poster_base_url = "https://image.tmdb.org/t/p/original";

function Details({
  id,
  original_name,
  original_title,
  vote_average,
  first_air_date,
  release_date,
  overview,
  genres,
  spoken_languages,
  serie,
  seasons,
  poster_path,
}) {
  const [key, setKey] = useState("");

  const getDate = (trsfrmdate) => {
    return trsfrmdate.slice(0, 4);
  };

  const addFavorite = () => {
    db.collection("favorites")
      .add({
        id: new Date().getTime().toString(),
        release_date: release_date
          ? getDate(release_date)
          : getDate(first_air_date),
        title: original_name ? original_name : original_title,
        posterImg: `${poster_base_url}${poster_path}`,
        added_date: `on ${new Date().toDateString()}`,
        added_by: auth.currentUser.displayName,
      })
      .then(
        alert(
          `${
            original_name ? original_name : original_title
          } has been added to your Favorites`
        )
      );
  };
  const addWatchList = () => {
    db.collection("watch_list")
      .add({
        id: new Date().getTime().toString(),
        release_date: release_date
          ? getDate(release_date)
          : getDate(first_air_date),
        title: original_name ? original_name : original_title,
        posterImg: `${poster_base_url}${poster_path}`,
        added_date: `on ${new Date().toDateString()}`,
        added_by: auth.currentUser.displayName,
      })
      .then(
        alert(
          `${
            original_name ? original_name : original_title
          } has been added to your WatchList`
        )
      );
  };

  useEffect(() => {
    const fetchMovieVideo = async (id) => {
      const url = `${
        serie
          ? `/tv/${id}/videos?api_key=${API_KEY}`
          : `/movie/${id}/videos?api_key=${API_KEY}`
      }`;
      const request = await axios.get(url);
      const response = await request.data;
      setKey(response?.results[0]?.key);
    };
    fetchMovieVideo(id && id);
  }, [serie, id]);
  return (
    <main className="details">
      <header className="details__header">
        <div>
          <div className="details__nameDate">
            <h1 className="details__originalName">
              {original_name ? original_name : original_title}
            </h1>
          </div>
          <button className="details__addBtn" onClick={addFavorite}>
            <FavoriteIcon
              className="details__icon"
              titleAccess="Mark as Favorite"
            />
          </button>
          <button className="details__addBtn" onClick={addWatchList}>
            <BookmarkIcon
              className="details__icon"
              titleAccess="Add to your Watchlist"
            />
          </button>
        </div>
        <div className="details__voteDetails">
          <img
            className="details__voteImg"
            src="https://iconsplace.com/wp-content/uploads/_icons/ffe500/256/png/rating-star-icon-19-256.png"
            alt=""
          />
          <span className="details__voteAverage">
            <h1>{vote_average}</h1>
            <h3>/10</h3>
          </span>
        </div>
      </header>
      <section className="details__info">
        <div className="details__detail">
          <h3 className="details__infoTitle">
            <span>Original Title</span> <span> : </span>{" "}
          </h3>
          <p className="details__infoDetails">
            {original_name ? original_name : original_title}
          </p>
        </div>
        <div className="details__detail">
          <h3 className="details__infoTitle">
            <span>Release Date</span> <span> : </span>{" "}
          </h3>
          <p className="details__infoDetails">
            {release_date ? release_date : first_air_date}
          </p>
        </div>
        <div className="details__detail">
          <h3 className="details__infoTitle">
            <span>Overview </span> <span> : </span>{" "}
          </h3>
          <p className="details__infoDetails">{overview}</p>
        </div>
        <div className="details__detail">
          <h3 className="details__infoTitle">
            <span>Genres </span> <span> : </span>{" "}
          </h3>
          <p className="details__infoDetails">
            {genres?.map((genre, index) => (
              <span key={index}>{genre.name},</span>
            ))}
          </p>
        </div>
        <div className="details__detail">
          <h3 className="details__infoTitle">
            <span>Original Langauge </span> <span> : </span>{" "}
          </h3>
          <p className="details__infoDetails">
            {spoken_languages && spoken_languages[0].english_name}
          </p>
        </div>
        <div className="details__triller">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="details__tvSeasons">
          {serie ? (
            <>
              <h1 className="details__seasonsTitle">
                Seasons :
                {seasons?.length === 1 ? seasons?.length : seasons?.length - 1}
              </h1>
              <div className="details__seasons">
                {seasons?.map((season, index) => {
                  return (
                    <div className="details__season" key={index}>
                      <div
                        className="detail__seasonDetail"
                        style={{
                          backgroundImage: `url(${poster_base_url}${season.poster_path})`,
                        }}
                      ></div>
                      <p className="detail__seasonName">{season.name}</p>
                      <span className="detail__seasonDate">
                        ({getDate(season.air_date)})
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div>""</div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Details;
