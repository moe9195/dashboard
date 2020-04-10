import React, { useState } from "react";
import Plot from "react-plotly.js";
import countryData from "./countries";
import Loading from "./Loading";
import { connect } from "react-redux";
import { setCountry } from "../redux/actions";
import arabicdictionaries from "./arabicCountries";

const reverseDict = countryData[5];
const reverseArabic = arabicdictionaries[1];

const MapChart = ({ loading, data, region, language, setCountry }) => {
  const handleClick = pointData => {
    let data = pointData.points[0];
    let index = data.pointIndex;
    let location = pointData.points[0].data.locations[index];
    setCountry(location);
  };

  let confirmedList = [],
    countryNames = [];
  data.map(country => {
    confirmedList.push(country.confirmed);
    countryNames.push(
      language ? reverseDict[country.name] : reverseArabic[country.name]
    );
  });

  let scaledData = confirmedList.map(num =>
    region ? Math.pow(num, 0.3) : num / 50
  );
  let plotdata = [
    {
      type: "scattergeo",
      mode: "markers",
      locations: countryNames,
      hoverinfo: "text, label",
      text: confirmedList,
      marker: {
        size: scaledData,
        color: "rgba(255,0,0,0.75)",
        sizeref: 1,
        line: {
          color: "black"
        }
      },
      name: "europe data"
    }
  ];
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {" "}
      <Plot
        data={plotdata}
        layout={
          region
            ? {
                modebar: { bgcolor: "rgba(255,255,255,0)" },
                geo: {
                  scope: "World",
                  resolution: "200",
                  showland: true,
                  landcolor: "#0f1316",
                  showframe: true,
                  bgcolor: "#0f1316",
                  showcountries: true,
                  showocean: true,
                  oceancolor: "#030217"
                },
                border: "solid",
                margin: { l: 0, r: 0, t: 0, b: 0, pad: 0 },
                plot_bgcolor: "rgba(0,0,0,0)",
                paper_bgcolor: "rgba(0,0,0,0)",
                autosize: true,
                height: 440
              }
            : {
                modebar: { bgcolor: "rgba(255,255,255,0)" },
                geo: {
                  scope: "World",
                  resolution: "200",
                  showland: true,
                  landcolor: "#0f1316",
                  showframe: true,
                  bgcolor: "#0f1316",
                  showcountries: true,
                  showocean: true,
                  oceancolor: "#030217",
                  lonaxis: { range: [-20, 61] },
                  lataxis: { range: [7, 47] }
                },
                border: "solid",
                margin: { l: 5, r: 5, t: 0, b: 0, pad: 0 },
                plot_bgcolor: "rgba(0,0,0,0)",
                paper_bgcolor: "rgba(0,0,0,0)",
                autosize: true,
                height: 440
              } // projection: { type: "", scale: 100 }
        }
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        onClick={data => handleClick(data)}
        config={
          {
            modeBarButtonsToRemove: [
              "toggleSpikelines",
              "autoScale2d",
              "hoverClosestCartesian",
              "hoverCompareCartesian",
              "select2d",
              "lasso2d",
              "hoverClosestGeo",
              "zoomInGeo",
              "zoomOutGeo"
            ],
            displaylogo: false
          } // onClick={(data) => handleShow(data)}
        }
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCountry: country => dispatch(setCountry(country))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MapChart);
