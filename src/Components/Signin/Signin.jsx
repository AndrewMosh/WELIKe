import React from "react";
import signin from "./signin.svg";
import "../Report/report.css";

export const Signin = () => {
  return (
    <div className="report">
      <div>
        <img src={signin} alt="thief" />
      </div>
      <form>
        <h2>Авторизация</h2>
        <label htmlFor="">E-mail</label>
        <input type="text" required />
        <label htmlFor="">Пароль</label>
        <input type="password" required />
        <button style={{ marginTop: "10px" }} className="register">
          Войти
        </button>
      </form>
    </div>
  );
};
