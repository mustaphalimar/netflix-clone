import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import axios from "../axios";
import Banner from "./Banner";
import Header from "./Header";
import Details from "./Details";
const API_KEY = "4a341142e78c862528cf762bbd7b17c9";

function Movie() {
  const [movie, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchSerieData = async (id) => {
      const url = `/movie/${id}?api_key=${API_KEY}`;
      try {
        const request = await axios.get(url);
        const response = await request.data;
        setMovie(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSerieData(id);
  }, [id]);
  return (
    <div className="movie">
      <Header />
      <Banner movie={movie} clicked />
      <Details {...movie} />
    </div>
  );
}

export default Movie;
