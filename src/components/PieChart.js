import React, { Component } from "react";
import Plot from "react-plotly.js";
import colormap from "colormap";
import countryData from "./countries";
import Loading from "./Loading";
import translate from "./translation";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const countries = countryData[1];

class PieChart extends Component {
  state = {
    selector: "confirmed"
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: !this.props.loading });
    }
  }

  handleOnClick = selected => {
    this.setState({ selector: selected });
  };

  render() {
    const selectors = ["confirmed", "deaths", "recovered"];

    const buttons = selectors.map(type => (
      <button
        className={
          this.state.selector === type
            ? "btn btn-outline-dark clicked"
            : "btn btn-outline-dark"
        }
        style={{ padding: "0vh 3vh 0vh 3vh" }}
        onClick={() => this.handleOnClick(type)}
      >
        <font style={{ fontSize: "1.5vh" }}>
          {this.props.language ? type : translate[type]}
        </font>
      </button>
    ));

    const confirmedData = this.props.data[0];
    const deathsData = this.props.data[1];
    const recoveredData = this.props.data[2];

    let confirmedX = [],
      confirmedY = [];
    confirmedData.map(country => {
      confirmedX.push(country.name);
      confirmedY.push(country.confirmed);
    });

    let deathsX = [],
      deathsY = [];
    deathsData.map(country => {
      deathsX.push(country.name);
      deathsY.push(country.deaths);
    });

    let recoveredX = [],
      recoveredY = [];
    recoveredData.map(country => {
      recoveredX.push(country.name);
      recoveredY.push(country.recovered);
    });

    const colorway = colormap({
      colormap: "jet",
      nshades: countries.length,
      format: "hex",
      alpha: 1
    });

    let data = null;
    if (this.state.selector === "confirmed") {
      data = [
        {
          values: confirmedY,
          labels: confirmedX,
          type: "pie",
          textinfo: "label",
          rotation: "-20"
        }
      ];
    } else if (this.state.selector === "deaths") {
      data = [
        {
          values: deathsY,
          labels: deathsX,
          type: "pie",
          textinfo: "label",
          rotation: "-20"
        }
      ];
    } else {
      data = [
        {
          values: recoveredY,
          labels: recoveredX,
          type: "pie",
          textinfo: "label",
          rotation: "-20"
        }
      ];
    }

    if (this.props.loading && data) {
      return <Loading />;
    }
    return (
      <div className="padded">
        <div style={{ padding: "0.25rem 0.0rem 0.35rem 0.0rem" }}>
          {" "}
          &nbsp;&nbsp; <FontAwesomeIcon
            icon={faQuestionCircle}
            size="1x"
          />{" "}
          &nbsp;&nbsp;
          {buttons}
        </div>

        <div>
          <Plot
            data={data}
            layout={{
              modebar: { bgcolor: "rgba(255,255,255,0)" },
              font: { color: "#99aab5", size: 11 },
              showlegend: false,
              colorway: colorway.reverse(),
              plot_bgcolor: "#191d20",
              paper_bgcolor: "#191d20",
              height: 355,
              autosize: true,
              margin: { l: 10, r: 10, t: 5, b: 5, pad: 0 }
            }}
            config={{
              modeBarButtonsToRemove: [
                "toggleSpikelines",
                "zoomIn2d",
                "zoomOut2d",
                "autoScale2d",
                "hoverClosestCartesian",
                "hoverCompareCartesian",
                "hoverClosestPie"
              ],
              displaylogo: false
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    );
  }
}

export default PieChart;
