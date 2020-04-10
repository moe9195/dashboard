import React, { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/",
  loading: true
});

const Footer = ({ language }) => {
  if (language) {
    return (
      <div
        style={{
          fontSize: 15,
          textAlign: "center",
          paddingTop: "1rem",
          color: "#99aab5"
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
  } else {
    return (
      <div
        style={{
          fontSize: 15,
          textAlign: "center",
          paddingTop: "1rem",
          color: "#99aab5",
          language: "ar",
          direction: "rtl"
        }}
      >
        <p>
          حقوق الطبع والنشر ©
          <a
            style={{ fontSize: 15, textAlign: "center", color: "#99aab5" }}
            href="https://github.com/moe9195"
          >
            محمد رحمه
          </a>{" "}
          2020. البيانات تم الحصول عليها من
          <a
            style={{ fontSize: 15, textAlign: "center", color: "#99aab5" }}
            href="https://github.com/backtrackbaba/covid-api"
          >
            &nbsp;CovidAPI.info &nbsp;
          </a>
          والتي تستند إلى مجموعة بيانات
          <a
            style={{ fontSize: 15, textAlign: "center", color: "#99aab5" }}
            href="https://github.com/CSSEGISandData/COVID-19"
          >
            &nbsp; جامعة جون هوبكنز.&nbsp;
          </a>
          &nbsp;تم تحويل بيانات CSV إلى تنسيق JSON Time Series بواسطة
          <a
            style={{ fontSize: 15, textAlign: "center", color: "#99aab5" }}
            href="https://github.com/pomber/covid19"
          >
            &nbsp;pomber
          </a>
        </p>
      </div>
    );
  }
};

export default Footer;
