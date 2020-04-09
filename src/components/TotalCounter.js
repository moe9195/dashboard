import React from "react";
import { Container } from "./styled-components";

const TotalCounter = (props) => {
  return (
    <div className="container-fluid padded ">
      <Container className=" padded">
        <Container className="row ">
          <Container className="card total-card is-card-dark is-total-text">
            <font style={{ fontSize: "18px", color: "#99aab5" }}>
              Confirmed
            </font>
            {props.data[0]}
          </Container>
        </Container>
      </Container>
      <Container className=" padded">
        <Container className="row">
          <Container className="card total-card is-card-dark is-total-text">
            <font style={{ fontSize: "18px", color: "#99aab5" }}>Deaths</font>
            {props.data[1]}
          </Container>
        </Container>
      </Container>
      <Container className=" padded">
        <Container className="row ">
          <Container className="card total-card is-card-dark is-total-text">
            <font style={{ fontSize: "18px", color: "#99aab5" }}>
              Recovered
            </font>
            {props.data[2]}
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default TotalCounter;
