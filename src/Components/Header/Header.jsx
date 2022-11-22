import React from "react";
import logo from "./logo.svg";
import "./header.css";

const Header = () => {
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img width="50px" height="50px" src={logo} alt="logo" />
          <span>Velik</span>
        </div>
        <ul>
          <li>сообщить о краже</li>
          <li>сотрудники</li>
          <li>войти</li>
          <li>регистрация</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
