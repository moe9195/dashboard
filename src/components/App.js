import React, { Component } from "react";
import { Container } from "./styled-components";
import countryData from "./countries";
import arabicdictionaries from "./arabicCountries";
import axios from "axios";
import Loading from "./Loading";
import { connect } from "react-redux";

import { changeLanguage } from "../redux/actions";

import Counter from "./Counter";
import TotalCounter from "./TotalCounter";
import TimeGraph from "./TimeGraph";
import PieChart from "./PieChart";
import MapChart from "./MapChart";
import CountryInfo from "./CountryInfo";
import Footer from "./Footer";
import LastUpdated from "./LastUpdated";

const MENA = countryData[0];
const dictionary = countryData[4];
const arabicdictionary = arabicdictionaries[0];

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/",
  loading: true
});

class App extends Component {
  state = {
    data: null,
    dataCountries: null,
    loading: true,
    region: false
  };

  fetchData = async countries => {
    try {
      let response1 = await instance.get(`global/latest`);
      let data1 = response1.data;
      let dict = {};
      for (let i = 0; i < countries.length; i++) {
        let response = await instance.get(`country/${countries[i]}`);
        let countryData = response.data.result;
        dict[countries[i]] = countryData;
      }
      let response2 = await instance.get(`/global/count`);
      let data2 = response2.data;
      this.setState({
        dataCountries: data1,
        timeData: dict,
        global: data2,
        loading: false
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = async () => {
    this.fetchData(MENA);
  };

  sortCountries = (items, region) => {
    let cleanedConfirmed = [],
      cleanedRecovered = [],
      cleanedDeaths = [];
    if (region) {
      items.map(country => {
        let countryName = Object.keys(country)[0];
        console.log(MENA);
        if (MENA.indexOf(countryName) !== -1) {
          let confirmedObj = {
            name: this.props.language
              ? dictionary[countryName]
              : arabicdictionary[countryName],
            confirmed: country[countryName].confirmed
          };
          let recoveredObj = {
            name: this.props.language
              ? dictionary[countryName]
              : arabicdictionary[countryName],
            recovered: country[countryName].recovered
          };
          let deathsObj = {
            name: this.props.language
              ? dictionary[countryName]
              : arabicdictionary[countryName],
            deaths: country[countryName].deaths
          };
          cleanedConfirmed.push(confirmedObj);
          cleanedRecovered.push(recoveredObj);
          cleanedDeaths.push(deathsObj);
        }
      });
    } else {
      items.map(country => {
        let countryName = Object.keys(country)[0];
        let confirmedObj = {
          name: this.props.language
            ? dictionary[countryName]
            : arabicdictionary[countryName],
          confirmed: country[countryName].confirmed
        };
        let recoveredObj = {
          name: this.props.language
            ? dictionary[countryName]
            : arabicdictionary[countryName],
          recovered: country[countryName].recovered
        };
        let deathsObj = {
          name: this.props.language
            ? dictionary[countryName]
            : arabicdictionary[countryName],
          deaths: country[countryName].deaths
        };
        cleanedConfirmed.push(confirmedObj);
        cleanedRecovered.push(recoveredObj);
        cleanedDeaths.push(deathsObj);
      });
    }
    const confirmed = cleanedConfirmed.sort(
      (a, b) => b.confirmed - a.confirmed
    );
    const recovered = cleanedRecovered.sort(
      (a, b) => b.recovered - a.recovered
    );
    const deaths = cleanedDeaths.sort((a, b) => b.deaths - a.deaths);
    return [[confirmed], [deaths], [recovered]];
  };

  render() {
    if (!this.state.loading) {
      const sortedData = this.sortCountries(
        this.state.dataCountries.result,
        true
      );

      // Cases country
      const confirmedData = sortedData[0][0];
      const deathsData = sortedData[1][0];
      const recoveredData = sortedData[2][0];

      const sortedDataMENA = this.sortCountries(
        this.state.dataCountries.result,
        false
      );

      const confirmedDataMENA = sortedDataMENA[0][0];
      const deathsDataMENA = sortedDataMENA[1][0];
      const recoveredDataMENA = sortedDataMENA[2][0];

      // Total Cases/Deaths/Recovered

      let totalConfirmedMENA = 0,
        totalDeathsMENA = 0,
        totalRecoveredMENA = 0;
      confirmedDataMENA.map(
        country => (totalConfirmedMENA += country.confirmed)
      );
      deathsDataMENA.map(country => (totalDeathsMENA += country.deaths));
      recoveredDataMENA.map(
        country => (totalRecoveredMENA += country.recovered)
      );

      let totalConfirmed = 0,
        totalDeaths = 0,
        totalRecovered = 0;
      confirmedData.map(country => (totalConfirmed += country.confirmed));
      deathsData.map(country => (totalDeaths += country.deaths));
      recoveredData.map(country => (totalRecovered += country.recovered));

      return (
        <Container>
          {/* content area start */}
          <Container className="container-fluid pr-1 pl-1 pt-1 pb-1">
            {/* header */}
            <Container className="row">
              <Container className="col-md-4 col-lg-12 is-light-text mb-2 small-padding">
                <Container
                  className=" card is-card-dark "
                  style={{ flexDirection: "row" }}
                >
                  <div className=" change-region">
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        onClick={() =>
                          this.setState({ region: !this.state.region })
                        }
                        id="regionswitch"
                      />{" "}
                      <label class="custom-control-label" for="regionswitch" />{" "}
                      {this.state.region && this.props.language
                        ? "show local data"
                        : this.state.region && !this.props.language
                        ? "أظهر الدول العربية"
                        : !this.state.region && !this.props.language
                        ? "أظهر جميع الدول "
                        : " show global data"}
                    </div>
                  </div>
                  <div className="dashboard-title">
                    {" "}
                    Coronavirus COVID-19 Global and Arab World Cases Dashboard
                  </div>
                  <div className=" change-language">
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        onClick={() =>
                          this.props.changeLanguage(!this.props.language)
                        }
                        id="languageswitch"
                      />{" "}
                      {this.props.language ? "اللغة العربية" : "English"}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <label
                        class="custom-control-label"
                        for="languageswitch"
                      />
                    </div>
                  </div>
                </Container>
              </Container>
            </Container>
            {/* row 1  */}
            <Container className="row">
              {/* counter list  */}
              <Container className="col-lg-2 col-sm-6 is-light-text mb-3 small-padding">
                <Container className="card grid-card is-card-dark">
                  <TotalCounter
                    data={
                      this.state.region
                        ? [
                            totalConfirmedMENA,
                            totalDeathsMENA,
                            totalRecoveredMENA
                          ]
                        : [totalConfirmed, totalDeaths, totalRecovered]
                    }
                    language={this.props.language}
                  />
                </Container>
              </Container>
              {/* counter  */}
              <Container className="col-lg-2 col-sm-6 is-light-text mb-3 small-padding">
                <Container className="card grid-card is-card-dark">
                  <Counter
                    data={
                      this.state.region
                        ? [confirmedDataMENA, deathsDataMENA, recoveredDataMENA]
                        : [confirmedData, deathsData, recoveredData]
                    }
                    loading={this.state.loading}
                    language={this.props.language}
                  />
                </Container>
              </Container>

              {/* timegraph  */}
              <Container className="col-lg-5 col-sm-6 is-light-text mb-3 small-padding">
                <Container className="card grid-card is-card-dark">
                  <TimeGraph
                    data={this.state.timeData}
                    loading={this.state.loading}
                    language={this.props.language}
                  />
                </Container>
              </Container>
              {/* pie chart  */}
              <Container className="col-lg-3 col-sm-6 is-light-text mb-3 small-padding">
                <Container className="card grid-card is-card-dark">
                  <PieChart
                    data={[confirmedData, deathsData, recoveredData]}
                    loading={this.state.loading}
                    language={this.props.language}
                  />
                </Container>
              </Container>
            </Container>

            {/* row 2  */}

            <Container className="row">
              <Container className="col-md-4 col-lg-6 is-light-text mb-3 small-padding ">
                <Container className="card is-card-dark map-card">
                  <MapChart
                    data={this.state.region ? confirmedDataMENA : confirmedData}
                    loading={this.state.loading}
                    region={this.state.region}
                    language={this.props.language}
                  />
                </Container>
              </Container>

              <Container className="col-md-4 col-lg-6 is-light-text mb-3 small-padding">
                <Container className="card is-card-dark info-card">
                  <CountryInfo
                    global={this.state.global.result}
                    language={this.props.language}
                  />
                </Container>
              </Container>
            </Container>

            {/* footer */}
            <Container className="row">
              <Container className="col-md-4 col-lg-2 is-light-text mb-2 small-padding">
                <Container className="card footer-card is-card-dark">
                  <LastUpdated language={this.props.language} />
                </Container>
              </Container>

              <Container className="col-md-4 col-lg-10 is-light-text mb-2 small-padding">
                <Container className="card is-card-dark footer-card">
                  <Footer language={this.props.language} />
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      );
    } else {
      return (
        <div>
          {" "}
          <Loading />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    language: state.data.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: language => dispatch(changeLanguage(language))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
