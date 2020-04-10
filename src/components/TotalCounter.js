import React from "react";
import { Container } from "./styled-components";

const TotalCounter = ({ data, language }) => {
  return (
    <Container className="container-fluid h-100 padded ">
      <Container className="row padded h-33">
        <Container className="card total-card is-card-dark is-total-text">
          <div style={{ fontSize: "18px", color: "#e1e5e8" }}>
            {language ? "Confirmed" : "الإجمالي"}
          </div>
          {data[0]}
        </Container>
      </Container>

      <Container className="row padded h-33">
        <Container className="card total-card is-card-dark is-total-text">
          <div style={{ fontSize: "18px", color: "#e1e5e8" }}>
            {language ? "Deaths" : "حالات وفاة"}
          </div>
          {data[1]}
        </Container>
      </Container>

      <Container className="row padded h-33">
        <Container className="card total-card is-card-dark is-total-text">
          <div style={{ fontSize: "18px", color: "#e1e5e8" }}>
            {language ? "Recovered" : "حالات شفاء"}
          </div>

          {data[2]}
        </Container>
      </Container>
    </Container>
  );
};

export default TotalCounter;
