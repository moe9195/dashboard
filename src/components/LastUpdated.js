import React, { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/",
  loading: true
});

const LastUpdated = () => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchDate = async () => {
    try {
      let response = await instance.get(`global`);
      let fetchedData = response.data;
      if (loading) {
        setDate(fetchedData.date);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDate();
  });

  return (
    <div>
      <div style={{ opacity: "0.5", textAlign: "center", paddingLeft: "1rem" }}>
        {" "}
        Last Updated at (MM/DD/YYYY) <br />
      </div>
      <div style={{ fontSize: 20, textAlign: "center" }}>
        {" "}
        {loading ? "" : `${date}`}
      </div>
    </div>
  );
};

export default LastUpdated;
