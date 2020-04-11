import React, { Component } from "react";
import Plot from "react-plotly.js";
import colormap from "colormap";
import countryData from "./countries";
import Loading from "./Loading";
import translate from "./translation";
import arabicdictionaries from "./arabicCountries";
import { Modal, Button } from "react-bootstrap";

import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const dictionary = arabicdictionaries[0];
const countries = countryData[0];
const countriesFull = countryData[1];

class TimeGraph extends Component {
  state = {
    selector: "Confirmed",
    logarithmic: false,
    show: false
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  setupTicks = (arr, delta, date) => {
    const l = arr.length;
    delta = Math.floor(l / delta);
    let newArr = [];
    for (let i = 0; i < arr.length; i = i + delta) {
      if (date) {
        newArr.push(this.formatDate(arr[i]));
      } else {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  };

  handleOnClick = selected => {
    this.setState({ selector: selected });
  };
  handleSwitch = () => {
    this.setState({ logarithmic: !this.state.logarithmic });
  };

  render() {
    const selectors = ["Confirmed", "Deaths", "Recovered"];

    const buttons = selectors.map(type => (
      <button
        className={
          this.state.selector === type
            ? "btn btn-outline-dark clicked"
            : "btn btn-outline-dark"
        }
        style={{ padding: "0vh 2vw 0vh 2vw" }}
        onClick={() => this.handleOnClick(type)}
      >
        <div className="button-fonts">
          {" "}
          {this.props.language ? type : translate[type]}
        </div>
      </button>
    ));

    const data = this.props.data;
    let plotDataY = [[[]], [[]], [[]]],
      plotDataX = [];
    for (let iso in data) {
      let countryObj = data[iso];
      var confirmedArr = [],
        deathsArr = [],
        recoveredArr = [],
        timeArr = [],
        counter = 0,
        dateArr = [];
      for (let date in countryObj) {
        var confirmed = countryObj[date].confirmed;
        var deaths = countryObj[date].deaths;
        var recovered = countryObj[date].recovered;
        confirmedArr.push(confirmed);
        deathsArr.push(deaths);
        recoveredArr.push(recovered);
        timeArr.push(counter);
        dateArr.push(date);
        counter++;
      }
      plotDataX.push(timeArr);
      plotDataY[0].push(confirmedArr);
      plotDataY[1].push(deathsArr);
      plotDataY[2].push(recoveredArr);
    }

    let scatterData = [];
    let select =
      this.state.selector === "Confirmed"
        ? 0
        : this.state.selector === "Deaths"
        ? 1
        : this.state.selector === "Recovered"
        ? 2
        : 3;

    for (let i = 1; i < plotDataX.length + 1; i++) {
      var trace = {
        x: dateArr,
        y: plotDataY[select][i],
        type: "scatter",
        name: this.props.language
          ? countriesFull[i - 1]
          : dictionary[countries[i - 1]]
      };
      scatterData.push(trace);
    }

    let logType = this.state.logarithmic ? "log" : "null";
    const colorway = colormap({
      colormap: "jet",
      nshades: countries.length,
      format: "hex",
      alpha: 1
    });

    if (this.props.loading) {
      return <Loading />;
    }
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
                onClick={() =>
                  this.setState({
                    show: true
                  })
                }
                icon={faQuestionCircle}
                size="1x"
              />
            </div>
            <div style={{ width: "95%", textAlign: "center" }}>
              {buttons}
              <button
                className={
                  this.state.logarithmic
                    ? "btn btn-outline-dark clicked"
                    : "btn btn-outline-dark"
                }
                style={{ padding: "0vh 1.8vw 0vh 1.8vw" }}
                onClick={() => this.handleSwitch()}
              >
                {" "}
                <div className="button-fonts">
                  {" "}
                  {this.props.language ? "Logarithmic" : "لوغاريتمي"}
                </div>
              </button>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.show}
          onHide={() =>
            this.setState({
              show: false
            })
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.language
                ? "Arab Region Time Graph"
                : "رسم بياني زمني للعالم العربي"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.language
              ? "This time graph shows the number of confirmed cases, total deaths, and daily increase for countries in the Arab World. You can view the graph for a specific country by double clicking its name in the legend bar. You can also click on more than one country to compare their graphs. Clicking on the logarithmic button switches the graph from a linear scale to a logarithmic scale."
              : "يوضح هذا الرسم البياني الزمني عدد الحالات المؤكدة وإجمالي الوفيات والزيادة اليومية لبلدان العالم العربي. يمكنك عرض الرسم البياني لبلد معين بالنقر المزدوج على اسمه في شريط وسيلة الإيضاح. يمكنك أيضًا النقر على أكثر من دولة لمقارنة الرسوم البيانية الخاصة بهم. يؤدي النقر فوق الزر اللوغاريتمي إلى تبديل الرسم البياني من مقياس خطي إلى مقياس لوغاريتمي"}
          </Modal.Body>
        </Modal>
        <div>
          <Plot
            data={scatterData}
            layout={{
              modebar: { bgcolor: "rgba(255,255,255,0)" },
              font: { color: "#e1e5e8", size: 12 },
              xaxis: { nticks: 15 },
              yaxis: { type: logType },
              colorway: colorway,
              plot_bgcolor: "#191d20",
              paper_bgcolor: "#191d20",
              autosize: true,
              height: 355,
              hovermode: "closest",
              margin: { l: 40, r: 20, t: 0, b: 0, pad: 0 },
              legend: {
                font: { size: 10 },
                bgcolor: "transparent",
                xanchor: "center",
                yanchor: "top",
                y: -0.1,
                x: 0.5,
                autosize: true,
                orientation: "h"
              }
            }}
            config={{
              modeBarButtonsToRemove: [
                "toggleSpikelines",
                "zoomIn2d",
                "zoomOut2d",
                "autoScale2d",
                "hoverClosestCartesian",
                "hoverCompareCartesian"
              ],
              displaylogo: false
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            modeBarButtonsToRemove={["toImage"]}
          />
        </div>
      </div>
    );
  }
}

export default TimeGraph;
