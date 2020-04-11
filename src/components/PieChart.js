import React, { Component } from "react";
import Plot from "react-plotly.js";
import colormap from "colormap";
import countryData from "./countries";
import Loading from "./Loading";
import translate from "./translation";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";

const countries = countryData[1];

class PieChart extends Component {
  state = {
    selector: "confirmed",
    show: false
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
    const selectors = ["Confirmed", "Deaths", "Recovered"];

    const buttons = selectors.map(type => (
      <button
        className={
          this.state.selector === type
            ? "btn btn-outline-dark clicked"
            : "btn btn-outline-dark"
        }
        style={{ padding: "0 1vw 0 1vw" }}
        onClick={() => this.handleOnClick(type)}
      >
        <div className="button-fonts">
          {this.props.language ? type : translate[type]}
        </div>
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
    if (this.state.selector === "Confirmed") {
      data = [
        {
          values: confirmedY,
          labels: confirmedX,
          type: "pie",
          textinfo: "label",
          rotation: "-20"
        }
      ];
    } else if (this.state.selector === "Deaths") {
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
            <div style={{ width: "95%", textAlign: "center" }}>{buttons}</div>
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
              {this.props.language ? "Pie Chart" : "مخطط دائري"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.language
              ? "This pie chart is divided into slices to illustrate numerical proportion for COVID-19 cases in the Arab Region. You can hover over each slice to see the number of cases in each country, as well as the percentage of cases compared to the total cases inthe Arab World."
              : "ينقسم هذا المخطط الدائري إلى شرائح لتوضيح الأعداد نسبة الإصابة بفيروس كورونا في العالم العربي. يمكنك المرور فوق كل شريحة لمعرفة عدد الحالات في كل بلد ، وكذلك نسبة الحالات إلى إجمالي الحالات في الوطن العربي"}
          </Modal.Body>
        </Modal>
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
