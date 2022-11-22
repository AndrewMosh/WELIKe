import React from "react";
import { Home } from "../Home/Home";
import { Report } from "../Report/Report";
import "./main.css";
import { Signup } from "../Signup/Signup";
import { Signin } from "../Signin/Signin";

const Main = () => {
  return (
    <main>
      <Home />
      <Report />
      <Signup />
      <Signin />
    </main>
  );
};
export default Main;
