import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Loading from "./Loading";
import { connect } from "react-redux";
import { setData } from "../redux/actions";

class Counter extends Component {
  state = {
    data: null,
    loading: true
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: !this.props.loading });
    }
  }

  render() {
    let confirmedRows = <></>;
    let deadRows = <></>;
    let recoveredRows = <></>;

    const confirmedData = this.props.data[0];
    const deathsData = this.props.data[1];
    const recoveredData = this.props.data[2];

    confirmedRows = confirmedData.map(country => (
      <tr>
        <td>
          &nbsp;&nbsp;&nbsp;
          <font style={{ color: "red", fontSize: "18px" }}>
            {country.confirmed}
          </font>
          <font style={{ fontSize: "16px", color: "#99aab5" }}>
            &nbsp;&nbsp;
            {country.name}
          </font>
        </td>
      </tr>
    ));
    deadRows = deathsData.map(country => (
      <tr>
        <td>
          &nbsp;&nbsp;&nbsp;
          <font style={{ color: "red", fontSize: "18px" }}>
            {country.deaths}
          </font>
          <font style={{ fontSize: "16px", color: "#99aab5" }}>
            &nbsp;&nbsp;
            {country.name}
          </font>
        </td>
      </tr>
    ));
    recoveredRows = recoveredData.map(country => (
      <tr>
        <td>
          &nbsp;&nbsp;&nbsp;
          <font style={{ color: "red", fontSize: "18px" }}>
            {country.recovered}
          </font>
          <font style={{ fontSize: "16px", color: "#99aab5" }}>
            &nbsp;&nbsp;
            {country.name}
          </font>
        </td>
      </tr>
    ));

    recoveredData.map(country => console.log(country));

    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <div className="counter-nav">
        <Tabs defaultActiveKey="confirmed" id="counter">
          <Tab
            eventKey="confirmed"
            title={this.props.language ? "Confirmed" : "الإجمالي"}
          >
            <div className="card mx-auto counter list my-custom-scrollbar">
              <table class="table-dark table-bordered ">
                <tbody>{this.props.loading ? "" : confirmedRows}</tbody>
              </table>
            </div>
          </Tab>
          <Tab
            eventKey="deaths"
            title={this.props.language ? "Deaths" : "حالات وفاة"}
          >
            <div className="card mx-auto counter list my-custom-scrollbar">
              <table class="table-dark table-bordered ">
                <tbody> {this.props.loading ? "" : deadRows}</tbody>
              </table>
            </div>
          </Tab>
          <Tab
            eventKey="recovered"
            title={this.props.language ? "Recovered" : "حالات شفاء"}
          >
            <div className="card mx-auto counter list my-custom-scrollbar">
              <table class="table-dark table-bordered">
                <tbody> {this.props.loading ? "" : recoveredRows}</tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setData: data => dispatch(setData(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Counter);
