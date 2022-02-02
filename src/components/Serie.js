import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Serie.css";
import axios from "../axios";
import Banner from "./Banner";
import Header from "./Header";
import Details from "./Details";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Serie() {
  const [serie, setSerie] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchSerieData = async (id) => {
      const url = `/tv/${id}?api_key=${API_KEY}`;
      try {
        const request = await axios.get(url);
        const response = await request.data;
        setSerie(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSerieData(id);
  }, [id]);
  return (
    <div className="serie">
      <Header />
      <Banner movie={serie} clicked />
      <Details {...serie} serie />
    </div>
  );
}

export default Serie;
