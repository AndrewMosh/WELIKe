import React from "react";
import { useState } from "react";
import axios from "axios";
import staff from "./officers.svg";
import "./officers.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import avatar from "./profile.svg";
import "./offdetails.css";

export const AllOfficers = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [info, setInfo] = useState([]);
  const [newWorker, setNewWorker] = useState(false);
  const [detail, setDetail] = useState(false);

  const { id } = useParams();
  let officer = info.find(({ _id }) => _id === id);
  console.log(officer);

  const changeMail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeSurname = (e) => {
    setSurname(e.target.value);
  };

  const allWorkers = async () => {
    const result = await axios.get(
      "https://skillfactory-final-project.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setInfo(result.data.officers);
  };

  useEffect(() => {
    allWorkers();
  }, []);

  const handleAdd = () => {
    setNewWorker(!newWorker);
  };

  return (
    <div>
      <div className="pic">
        <img src={staff} alt="officers" />
      </div>
      <h2 className="title">Список всех зарегистрированных сотрудников</h2>
      <div className="officerContainer">
        <ol className="officers">
          {info.map((worker) => (
            <div className="approve">
              <Link
                onClick={() => setDetail(!detail)}
                className="link"
                to={`/officers/${worker._id}`}
              >
                <li>{worker.email}</li>
              </Link>

              <span>X</span>
            </div>
          ))}
        </ol>
        <button className="addButton" onClick={handleAdd}>
          Добавить сотрудника
        </button>
        {(newWorker && (
          <form method="post" className="addOfficer">
            <div className="relat">
              <label>E-mail </label>
              <input
                onChange={changeMail}
                type="text"
                name="email"
                value={email}
                required
              />

              <label>Пароль</label>
              <input
                onChange={changePassword}
                type="password"
                name="пароль"
                value={password}
                required
              />

              <label>Имя</label>
              <input
                onChange={changeName}
                type="text"
                name="имя"
                value={name}
              />

              <label>Фамилия</label>
              <input
                onChange={changeSurname}
                type="text"
                name="фамилия"
                value={surname}
              />
              <span onClick={() => setNewWorker(!newWorker)} className="close">
                X
              </span>
              <button>Добавить</button>
            </div>
          </form>
        )) ||
          (detail && (
            <div className="details">
              <div className="businessCard">
                <div className="detailContainer">
                  <img className="avatar" src={avatar} alt="avatar" />

                  <div>
                    <Link to={`/officers/`}>
                      {" "}
                      <span className="link" onClick={() => setDetail(!detail)}>
                        X
                      </span>
                    </Link>

                    <div className="surname">
                      <label htmlFor="">Имя:</label>{" "}
                      <input type="text" value={officer.firstName} />
                      <label htmlFor="">Фамилия:</label>
                      <input type="text" value={officer.lastName} />
                      <label>Эл.почта:</label>
                      <input type="text" value={officer.email} />
                      <label>clientId:</label>{" "}
                      <input type="text" value={officer.clientId} />
                      <button className="edit">ред.</button>
                    </div>
                    {(officer.approved === true && (
                      <button className="cancel">Отозвать</button>
                    )) || <button className="approveButton">Одобрить</button>}
                  </div>
                </div>
              </div>
            </div>
          )) ||
          null}
      </div>
    </div>
  );
};
