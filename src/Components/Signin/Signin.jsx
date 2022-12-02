import React from "react";
import signin from "./signin.svg";
import "../Report/report.css";
import "./signin.css";
import { Home } from "../Home/Home";

export const Signin = ({
  admin,
  password,
  setPassword,
  email,
  setEmail,
  message,
  handleSubmit,
  loading,
}) => {
  return (
    <>
      {(loading && (
        <div className="loading" style={{ alignSelf: "center" }}>
          loading...
        </div>
      )) ||
        (!admin && (
          <div style={{ marginTop: "90px" }} className="report">
            <div className="signin">
              <img src={signin} alt="thief" />
            </div>
            <form className="formPublic" onSubmit={handleSubmit}>
              <h2>Авторизация</h2>
              <label>E-mail</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required
              />
              <label>Пароль</label>
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button style={{ margin: "30px 0 20px 0" }} className="register">
                Войти
              </button>

              <p>{message}</p>
            </form>
          </div>
        )) || <Home />}
    </>
  );
};
