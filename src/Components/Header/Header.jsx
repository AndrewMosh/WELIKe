import React from "react";
import logo from "./logo.svg";
import "./header.css";

const Header = () => {
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img width="40px" height="40px" src={logo} alt="logo" />
          <span>Velik</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
