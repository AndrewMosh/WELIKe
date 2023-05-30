import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import staff from "../AllOfficers/officers.svg";
import "./messages.css";
import { Link } from "react-router-dom";
import { ForAuth } from "../Report/ForAuth";
import { ReportDetail } from "./ReportDetail";
import { allMessages } from "../../store/messageSlice";
import { useSelector, useDispatch } from "react-redux";

export const Messages = () => {
  const { messages } = useSelector((state) => state.messages);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(false);
  const [newMessage, setNewMessage] = useState(false);

  const handleDetail = () => {
    setDetail(!detail);
  };
  useEffect(() => {
    dispatch(allMessages());
  }, [detail, newMessage, dispatch]);

  return (
    <div>
      {(isAuthenticated && (
        <>
          {" "}
          <div className="pic">
            <img src={staff} alt="officers" />
          </div>
          <h3 className="title">Все сообщения о кражах</h3>
          <div className="wrapper">
            <button
              className="addMessage"
              onClick={() => setNewMessage(!newMessage)}
            >
              Добавить сообщение
            </button>

            {(
              <div className="loading" style={{ alignSelf: "center" }}>
                loading...
              </div>
            ) ||
              (messages.length === 0 && <div></div>) ||
              (newMessage && (
                <ForAuth
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                />
              ))}
            <div className="messageContainer">
              {messages.map((item) => (
                <div key={item._id} className="message">
                  <span
                    className="new"
                    style={{
                      textAlign: "center",
                      borderRadius: "10px",
                      minWidth: "90px",
                      backgroundColor:
                        (item.status === "new" && "green") ||
                        (item.status === "in_progress" &&
                          "rgb(209, 130, 19)") ||
                        (item.status === "done" && "red"),
                    }}
                  >
                    {item.status}
                  </span>
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
            {detail && <ReportDetail detail={detail} setDetail={setDetail} />}
          </div>
        </>
      )) || (
        <div
          style={{ color: "#5288bd", fontSize: "200px", textAlign: "center" }}
        >
          404
        </div>
      )}
    </div>
  );
};
