import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const Messages = () => {
  const [cases, setCases] = useState([]);
  const allMessages = async () => {
    const result = await axios.get(
      "https://skillfactory-final-project.herokuapp.com/api/cases/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setCases(result.data.data);
  };

  useEffect(() => {
    allMessages();
  }, []);

  return (
    <div>
      {cases.map((item) => (
        <>
          <span>{item.status}</span>
          <li>{item.ownerFullName}</li>
        </>
      ))}
    </div>
  );
};
