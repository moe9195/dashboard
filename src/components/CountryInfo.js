import React, { useState, useEffect, useCallback } from "react";
import Plot from "react-plotly.js";
import countryData from "./countries";
import { connect } from "react-redux";
import axios from "axios";
import arabicdictionaries from "./arabicCountries";
import translate from "./translation";

const dictionary = countryData[4];
const arabicdictionary = arabicdictionaries[0];

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/",
  loading: true
});

const CountryInfo = ({ country, global, language }) => {
  const [data, setData] = useState(global);
  const [loading, setLoading] = useState(true);
  const [X, setX] = useState([]);
  const [Y1, setY1] = useState([]);
  const [Y2, setY2] = useState([]);
  const [Y3, setY3] = useState([]);
  const [Y4, setY4] = useState([]);
  const [logarithmic, setLogarithmic] = useState(false);
  const [selector, setSelector] = useState("confirmed");

  const handleSwitch = () => {
    setLogarithmic(!logarithmic);
  };

  const handleOnClick = selected => {
    setSelector(selected);
  };

  const fetchData = async country => {
    try {
      let response = await instance.get(`country/${country}`);
      let countryData = response.data.result;
      setData(countryData);
      console.log(data["2020-03-22"]);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    () => {
      fetchData(country);
    },
    [country]
  );

  let logType = logarithmic ? "log" : "null";

  if (data && loading) {
    var Xtemp = [];
    var Y1temp = [],
      Y2temp = [],
      Y3temp = [],
      Y4temp = [];
    for (var key in data) {
      Xtemp.push(key);
      Y1temp.push(data[key].confirmed);
      Y2temp.push(data[key].deaths);
      Y3temp.push(data[key].recovered);
    }
    if (Xtemp.length > 1) {
      setX(Xtemp);
      setY1(Y1temp);
      setY2(Y2temp);
      setY3(Y3temp);
      for (let i = 0; i < Xtemp.length; i++) {
        Y4temp.push(Y1temp[i + 1] - Y1temp[i]);
      }
      setY4(Y4temp);
      setLoading(false);
    }
  }

  if (!loading) {
    const trace1 = {
      x: X,
      y: Y1,
      type: "scatter",
      name: "Confirmed",
      mode: "lines+markers",
      line: { color: "#ff0000" },
      marker: { color: "#ff0000" }
    };
    const trace2 = {
      x: X,
      y: Y2,
      type: "scatter",
      name: "Deaths",
      mode: "lines+markers",
      line: { color: "#ff0000" },
      marker: { color: "#ff0000" }
    };
    const trace3 = {
      x: X,
      y: Y3,
      type: "scatter",
      name: "Recovered",
      mode: "lines+markers",
      line: { color: "#ff0000" },
      marker: { color: "#ff0000" }
    };
    const bar = {
      x: X,
      y: Y4,
      type: "bar",
      name: "New Cases",
      line: { color: "#ff0000" },
      marker: { color: "#ff0000" }
    };
    const plotData = [trace1, trace2, trace3, bar];

    const selectors = ["confirmed", "deaths", "recovered", "daily increase"];

    const buttons = selectors.map(type => (
      <button
        className={
          selector === type
            ? "btn btn-outline-dark clicked"
            : "btn btn-outline-dark"
        }
        style={{ padding: "0vh 5vh 0vh 5vh" }}
        onClick={() => handleOnClick(type)}
      >
        {language ? type : translate[type]}
      </button>
    ));
    let select =
      selector === "confirmed"
        ? 0
        : selector === "deaths"
        ? 1
        : selector === "recovered"
        ? 2
        : selector === "daily increase"
        ? 3
        : null;
    return (
      <div className="padded">
        {buttons}
        <div className="btn toggler">
          <div class="custom-control custom-switch ">
            <input
              type="checkbox"
              class="custom-control-input"
              onClick={() => handleSwitch()}
              id="country-info-switch"
            />

            <label
              class="custom-control-label"
              for="country-info-switch"
              style={{ color: "#99aab5" }}
            >
              {language ? "logarithmic" : "لوغاريتمي"}
            </label>
          </div>
        </div>
        <div>
          <Plot
            data={[plotData[select]]}
            layout={{
              modebar: { bgcolor: "rgba(255,255,255,0)" },
              title:
                !country && language
                  ? "Global"
                  : !country && !language
                  ? "العالم"
                  : country && language
                  ? `${dictionary[country]}`
                  : `${arabicdictionary[country]}`,
              font: { color: "#99aab5", size: 12 },
              xaxis: { nticks: 15 },
              yaxis: { type: logType },
              margin: { l: 40, r: 20, t: 50, b: 40, pad: 0 },
              plot_bgcolor: "#191d20",
              paper_bgcolor: "#191d20",
              height: "385",
              autosize: true
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            config={{
              modeBarButtonsToRemove: [
                "toggleSpikelines",
                "zoomIn2d",
                "zoomOut2d",
                "autoScale2d",
                "hoverClosestCartesian",
                "hoverCompareCartesian",
                "select2d",
                "lasso2d"
              ],
              displaylogo: false
            }}
          />
        </div>
      </div>
    );
  } else {
    return <div>Click on a country from the map</div>;
  }
};
const mapStateToProps = state => {
  return {
    country: state.data.country
  };
};

export default connect(
  mapStateToProps,
  null
)(CountryInfo);
