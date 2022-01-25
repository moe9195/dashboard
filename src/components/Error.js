import React from "react";

const Error = ({ error }) => (
  <div className="centered-content">
    <h1>{error.message}</h1>
  </div>
);

export default Error;
