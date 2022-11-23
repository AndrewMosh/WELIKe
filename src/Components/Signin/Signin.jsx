import React from "react";
import signin from "./signin.svg";
import "../Report/report.css";
import "./signin.css";

export const Signin = () => {
  return (
    <div style={{ marginTop: "90px" }} className="report">
      <div className="signin">
        <img src={signin} alt="thief" />
      </div>
      <form>
        <h2>Авторизация</h2>
        <label htmlFor="">E-mail</label>
        <input type="text" required />
        <label htmlFor="">Пароль</label>
        <input type="password" required />
        <button style={{ margin: "30px 0 20px 0" }} className="register">
          Войти
        </button>
      </form>
    </div>
  );
};
