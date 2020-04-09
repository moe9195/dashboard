import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import colormap from "colormap";
import countryData from "./countries";
import Loading from "./Loading";

const countries = countryData[0];
const countriesFull = countryData[1];

class TimeGraph extends Component {
  state = {
    selector: "confirmed",
    logarithmic: false,
  };

  capitalizeFirstLetter = (string) => {
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

  handleOnClick = (selected) => {
    this.setState({ selector: selected });
  };
  handleSwitch = () => {
    this.setState({ logarithmic: !this.state.logarithmic });
  };

  render() {
    const selectors = ["confirmed", "deaths", "recovered"];

    const buttons = selectors.map((selector) => (
      <button
        className={
          this.state.selector === selector
            ? "btn btn-outline-dark clicked"
            : "btn btn-outline-dark"
        }
        style={{ padding: "0vh 5.5vh 0vh 5.5vh" }}
        onClick={() => this.handleOnClick(selector)}
      >
        {selector}
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
      this.state.selector === "confirmed"
        ? 0
        : this.state.selector === "deaths"
        ? 1
        : this.state.selector === "recovered"
        ? 2
        : 3;

    for (let i = 1; i < plotDataX.length + 1; i++) {
      var trace = {
        x: dateArr,
        y: plotDataY[select][i],
        type: "scatter",
        name: countriesFull[i - 1],
      };
      scatterData.push(trace);
    }

    let logType = this.state.logarithmic ? "log" : "null";
    const colorway = colormap({
      colormap: "jet",
      nshades: countries.length,
      format: "hex",
      alpha: 1,
    });

    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <div className=" padded">
        {buttons}
        <div className="btn toggler">
          <div class="custom-control custom-switch ">
            <input
              type="checkbox"
              class="custom-control-input"
              onClick={() => this.handleSwitch()}
              id="switch"
            />

            <label
              class="custom-control-label"
              for="switch"
              style={{ color: "#99aab5" }}
            >
              logarithmic
            </label>
          </div>
        </div>
        <div>
          <Plot
            data={scatterData}
            layout={{
              modebar: { bgcolor: "rgba(255,255,255,0)" },
              title: `Total ${this.capitalizeFirstLetter(this.state.selector)}`,
              font: { color: "#99aab5", size: 12 },
              xaxis: { nticks: 15 },
              yaxis: { type: logType },
              colorway: colorway,
              plot_bgcolor: "#191d20",
              paper_bgcolor: "#191d20",
              autosize: true,
              height: "337",
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
                orientation: "h",
              },
            }}
            config={{
              modeBarButtonsToRemove: [
                "toggleSpikelines",
                "zoomIn2d",
                "zoomOut2d",
                "autoScale2d",
                "hoverClosestCartesian",
                "hoverCompareCartesian",
              ],
              displaylogo: false,
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
