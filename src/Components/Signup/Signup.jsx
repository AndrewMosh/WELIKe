import React from "react";
import signup from "./signup.svg";
import "../Report/report.css";
import "./signup.css";

export const Signup = () => {
  return (
    <div className="report">
      <div>
        <img src={signup} alt="thief" />
      </div>
      <form>
        <h2>Регистрация</h2>
        <label htmlFor="">E-mail</label>
        <input type="text" required />
        <label htmlFor="">Пароль</label>
        <input type="password" required />
        <label htmlFor="">Имя</label>
        <input type="text" />
        <label htmlFor="">Фамилия</label>
        <input type="text" />
        <label htmlFor="">Client ID</label>
        <input type="text" required />
        <button className="register">Зарегистрироваться</button>
      </form>
    </div>
  );
};
