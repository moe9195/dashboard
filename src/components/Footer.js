import React, { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/",
  loading: true,
});

const Footer = () => {
  return (
    <div
      style={{
        fontSize: 15,
        textAlign: "center",
        paddingTop: "1rem",

        color: "#99aab5",
      }}
    >
      Copyright ©{" "}
      <a
        style={{ fontSize: 15, textAlign: "center", color: "#99aab5" }}
        href="https://github.com/moe9195"
      >
        Mohammad Rahmeh
      </a>{" "}
      2020. Data obtained from{" "}
      <a
        style={{ fontSize: 15, textAlign: "center", color: "#99aab5" }}
        href="https://github.com/backtrackbaba/covid-api"
      >
        CovidAPI.info
      </a>{" "}
      , which builds upon the dataset of{" "}
      <a
        style={{ fontSize: 15, textAlign: "center", color: "#99aab5" }}
        href="https://github.com/CSSEGISandData/COVID-19"
      >
        John Hopkins University.
      </a>
      &nbsp;The CSV data was converted to JSON Time Series format by{" "}
      <a
        style={{ fontSize: 15, textAlign: "center", color: "#99aab5" }}
        href="https://github.com/pomber/covid19"
      >
        pomber.
      </a>
    </div>
  );
};

export default Footer;
