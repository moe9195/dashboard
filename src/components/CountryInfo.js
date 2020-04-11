import React, { useState, useEffect, useCallback } from "react";
import Plot from "react-plotly.js";
import countryData from "./countries";
import { connect } from "react-redux";
import axios from "axios";
import arabicdictionaries from "./arabicCountries";
import translate from "./translation";
import { Modal, Button } from "react-bootstrap";

import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [Y5, setY5] = useState([]);
  const [Y6, setY6] = useState([]);
  const [logarithmic, setLogarithmic] = useState(false);
  const [selector, setSelector] = useState("Confirmed");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      Y4temp = [],
      Y5temp = [],
      Y6temp = [];
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
        Y5temp.push(Y2temp[i + 1] - Y2temp[i]);
        Y6temp.push(Y3temp[i + 1] - Y3temp[i]);
      }
      setY4(Y4temp);
      setY5(Y5temp);
      setY6(Y6temp);
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

      mode: "lines+markers",
      line: { color: "#ff0000" },
      marker: { color: "#ff0000" }
    };
    const bar1 = {
      x: X,
      y: Y4,
      type: "bar",
      name: language ? "Confirmed" : translate["Confirmed"],
      line: { color: "blue" },
      marker: { color: "blue" }
    };

    const bar2 = {
      x: X,
      y: Y5,
      type: "bar",
      name: language ? "Deaths" : translate["Deaths"],
      line: { color: "red" },
      marker: { color: "red" }
    };

    const bar3 = {
      x: X,
      y: Y6,
      type: "bar",
      name: language ? "Recovered" : translate["Recovered"],
      line: { color: "yellow" },
      marker: { color: "yellow" }
    };

    const plotData = [[trace1], [trace2], [trace3], [bar3, bar2, bar1]];

    const selectors = ["Confirmed", "Deaths", "Recovered", "Daily Increase"];

    const buttons = selectors.map(type => (
      <button
        className={
          selector === type
            ? "btn btn-outline-dark clicked"
            : "btn btn-outline-dark"
        }
        style={{ padding: "0vh 2vw 0vh 2vw" }}
        onClick={() => handleOnClick(type)}
      >
        {" "}
        <div className="button-fonts"> {language ? type : translate[type]}</div>
      </button>
    ));
    let select =
      selector === "Confirmed"
        ? 0
        : selector === "Deaths"
        ? 1
        : selector === "Recovered"
        ? 2
        : selector === "Daily Increase"
        ? 3
        : null;
    return (
      <div className="padded">
        <div className="buttons-header">
          <div className="row button-header">
            <div
              className="card help-card"
              style={{ width: "5%", textAlign: "left", paddingLeft: "0.7rem" }}
            >
              {" "}
              <FontAwesomeIcon
                onClick={handleShow}
                icon={faQuestionCircle}
                size="1x"
              />
            </div>
            <div style={{ width: "95%", textAlign: "center" }}>
              {buttons}
              <button
                className={
                  logarithmic
                    ? "btn btn-outline-dark clicked"
                    : "btn btn-outline-dark"
                }
                style={{ padding: "0vh 1.8vw 0vh 1.8vw" }}
                onClick={() => handleSwitch()}
              >
                {" "}
                <div className="button-fonts">
                  {" "}
                  {language ? "Logarithmic" : "لوغاريتمي"}
                </div>
              </button>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {language
                ? "Country Specific Time Graph"
                : "رسم بياني زمني محدد لكل بلد"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {language
              ? "This time graph shows the number of confirmed cases, total deaths, and daily increase for each country. It initially shows the numbers for the entire world, but you can select a specific country by clicking on it on the map. You can also click the logarithmic button to switch from a linear to a logarithmic scale."
              : "يوضح هذا الرسم البياني الزمني عدد الحالات المؤكدة وإجمالي الوفيات والزيادة اليومية لكل بلد. يعرض في البداية أرقامًا للعالم بأكمله ، ولكن يمكنك تحديد بلد معين من خلال النقر عليه على الخريطة. يمكنك أيضًا النقر فوق الزر اللوغاريتمي للتبديل من مقياس خطي إلى مقياس لوغاريتمي."}
          </Modal.Body>
        </Modal>

        <Plot
          data={plotData[select]}
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
            font: { color: "#e1e5e8", size: 12 },
            xaxis: { nticks: 15 },
            yaxis: { type: logType },
            margin: { l: 40, r: 20, t: 50, b: 40, pad: 0 },
            plot_bgcolor: "#191d20",
            paper_bgcolor: "#191d20",
            height: 405,
            autosize: true,
            barmode: "stack"
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
