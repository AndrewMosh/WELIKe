import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import staff from "../AllOfficers/officers.svg";
import "./messages.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ForAuth } from "../Report/ForAuth";

export const Messages = () => {
  const [cases, setCases] = useState([]);
  const [detail, setDetail] = useState(false);
  const [editMode, setEdit] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const { id } = useParams();
  //редактируем детали кражи
  let report = cases.find(({ _id }) => _id === id);

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
  }, []);

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
            <ForAuth newMessage={newMessage} setNewMessage={setNewMessage} />
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
          <div className="modalDetail">
            <div className="modalContainer">
              <h3>Детали кражи</h3>

              <Link to={`/cases/`}>
                <span onClick={() => setDetail(!detail)}>X</span>
              </Link>

              <div>
                <label>
                  Номер заявки <br />
                  <input
                    type="text"
                    value={report._id === null ? "" : report._id}
                    disabled
                  />
                </label>
                <label>
                  Цвет
                  <br />
                  <input
                    type="text"
                    value={report.color === null ? "" : report.color}
                    disabled
                  />
                </label>
                <label>
                  Создано
                  <br />
                  <input
                    type="text"
                    autoFocus
                    value={report.createdAt}
                    disabled={!editMode ? true : false}
                    style={{
                      color: editMode && "black",
                      backgroundColor: editMode && "white",
                    }}
                  />
                </label>
                <label>
                  Дата кражи
                  <br />
                  <input
                    type="text"
                    value={report.date === null ? "" : report.date}
                    disabled
                  />
                </label>
              </div>
              <div>
                <label>
                  Описание
                  <br />
                  <input
                    type="text"
                    value={
                      report.description === null ? "" : report.description
                    }
                    disabled
                  />
                </label>
                <label>
                  Номер велосипеда
                  <br />
                  <input
                    type="text"
                    value={
                      report.licenseNumber === null ? "" : report.licenseNumber
                    }
                    disabled
                  />
                </label>
                <label>
                  Сотрудник
                  <br />
                  <input
                    type="text"
                    value={report.officer === null ? "" : report.officer}
                    disabled
                  />
                </label>
                <label>
                  Имя владельца
                  <br />
                  <input
                    type="text"
                    value={
                      report.ownerFullName === null ? "" : report.ownerFullName
                    }
                    disabled
                  />
                </label>
              </div>
              <div>
                <label>
                  Решение
                  <br />
                  <input
                    type="text"
                    value={report.resolution === null ? "" : report.resolution}
                    disabled
                  />
                </label>
                <label>
                  Статус
                  <br />
                  <input
                    type="text"
                    value={report.status === null ? "" : report.status}
                    disabled
                  />
                </label>
                <label>
                  Тип
                  <br />
                  <input
                    type="text"
                    value={report.type === null ? "" : report.type}
                    disabled
                  />
                </label>
                <label>
                  Обновлено
                  <br />
                  <input
                    type="text"
                    value={report.updatedAt === null ? "" : report.updatedAt}
                    disabled
                  />
                </label>
              </div>
              {(!editMode && (
                <div
                  onClick={() => setEdit(!editMode)}
                  className="editDetail"
                  role="button"
                >
                  Редактировать
                </div>
              )) || (
                <div
                  onClick={() => setEdit(!editMode)}
                  className="saveDetail"
                  role="button"
                >
                  Сохранить
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
