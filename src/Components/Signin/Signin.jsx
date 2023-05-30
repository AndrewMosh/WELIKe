import React, { useState } from "react";
import signin from "./signin.svg";
import "../Report/report.css";
import "./signin.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    if (isAuthenticated) {
      setEmail("");
      setPassword("");
      setMessage("");
      navigate("/messages");
    } else {
      setEmail("");
      setPassword("");
      setMessage("Вы ввели неверные данные");
    }
  };
  return (
    <>
      {
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
      }
    </>
  );
};
