import React from "react";
import { Container } from "./styled-components";

const TotalCounter = ({ data, language }) => {
  return (
    <div className="container-fluid padded ">
      <Container className=" padded">
        <Container className="row ">
          <Container className="card total-card is-card-dark is-total-text">
            <font style={{ fontSize: "18px", color: "#99aab5" }}>
              {language ? "Confirmed" : "الإجمالي"}
            </font>
            {data[0]}
          </Container>
        </Container>
      </Container>
      <Container className=" padded">
        <Container className="row">
          <Container className="card total-card is-card-dark is-total-text">
            <font style={{ fontSize: "18px", color: "#99aab5" }}>
              {language ? "Deaths" : "حالات وفاة"}
            </font>
            {data[1]}
          </Container>
        </Container>
      </Container>
      <Container className=" padded">
        <Container className="row ">
          <Container className="card total-card is-card-dark is-total-text">
            <font style={{ fontSize: "18px", color: "#99aab5" }}>
              {language ? "Recovered" : "حالات شفاء"}
            </font>
            {data[2]}
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default TotalCounter;
