import React from "react";
import { useState } from "react";
import axios from "axios";
import staff from "./officers.svg";
import "./officers.css";

export const AllOfficers = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

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

  return (
    <div>
      <div className="pic">
        <img src={staff} alt="officers" />
      </div>
      <div className="officerContainer">
        <h2 className="title">Список всех зарегистрированных сотрудников</h2>
        <button>Посмотреть</button>
        <form method="post">
          <h2>Регистрация</h2>
          <label>
            E-mail <br />
            <input
              onChange={changeMail}
              type="text"
              name="email"
              value={email}
              required
            />
          </label>

          <label>
            Пароль <br />
            <input
              onChange={changePassword}
              type="password"
              name="пароль"
              value={password}
              required
            />
          </label>

          <label>
            Имя <br />{" "}
            <input onChange={changeName} type="text" name="имя" value={name} />
          </label>

          <label>
            Фамилия <br />
            <input
              onChange={changeSurname}
              type="text"
              name="фамилия"
              value={surname}
            />
          </label>

          <button>Создать аккаунт</button>
        </form>

        <ol className="officers">
          <div className="approve">
            <button>
              <strong>Удалить</strong>
            </button>
          </div>
        </ol>
      </div>
    </div>
  );
};
