import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import staff from "../AllOfficers/officers.svg";
import "./messages.css";
import { Link } from "react-router-dom";
import { ForAuth } from "../Report/ForAuth";
import { ReportDetail } from "./ReportDetail";

export const Messages = ({ approved, setApproved }) => {
  const [cases, setCases] = useState([]);
  const [detail, setDetail] = useState(false);
  const [newMessage, setNewMessage] = useState(false);

  const handleDetail = () => {
    setDetail(!detail);
  };
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
  }, [detail]);

  return (
    <div>
      <div className="pic">
        <img src={staff} alt="officers" />
      </div>
      <h3 className="title">Все сообщения о кражах</h3>
      <div className="wrapper">
        <div>
          <button
            className="addMessage"
            onClick={() => setNewMessage(!newMessage)}
          >
            Добавить сообщение
          </button>
          {newMessage && (
            <ForAuth
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              approved={approved}
              setApproved={setApproved}
            />
          )}
          {cases.map((item) => (
            <div key={item._id} className="message">
              <span className="new">{item.status}</span>
              <Link
                onClick={handleDetail}
                className="link"
                to={`/cases/${item._id}`}
              >
                <li>{item.ownerFullName}</li>
              </Link>
            </div>
          ))}
        </div>
        {detail && (
          <ReportDetail
            cases={cases}
            detail={detail}
            setDetail={setDetail}
            approved={approved}
            setApproved={setApproved}
          />
        )}
      </div>
    </div>
  );
};
