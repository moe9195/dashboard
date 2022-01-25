import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => (
  <div className="centered-content">
    <FontAwesomeIcon icon={faSpinner} spin size="5x" />
  </div>
);

export default Loading;
