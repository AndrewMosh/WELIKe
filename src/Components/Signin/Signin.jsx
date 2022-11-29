import React from "react";
import signin from "./signin.svg";
import { useState } from "react";
import "../Report/report.css";
import "./signin.css";
import axios from "axios";
import { Home } from "../Home/Home";

export const Signin = ({ isAuth, setAuth, admin, setAdmin, data, setData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/auth/sign_in",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )

      .then((response) => {
        setData(response.data);
        setAuth(!isAuth);
        localStorage.setItem("token", response.data.data.token);
        if (response.data.data.user.approved === true) {
          setAdmin(!admin);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  };

  return (
    <>
      {(!isAuth && (
        <div style={{ marginTop: "90px" }} className="report">
          <div className="signin">
            <img src={signin} alt="thief" />
          </div>
          <form onSubmit={handleSubmit}>
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
