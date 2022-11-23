import React from "react";
import { Home } from "../Home/Home";
import { Report } from "../Report/Report";
import "./main.css";
import { Signup } from "../Signup/Signup";
import { Signin } from "../Signin/Signin";
import { AllOfficers } from "../AllOfficers/AllOfficers";
import { OfficersDetails } from "../OfficersDetails/OfficersDetails";

const Main = () => {
  return (
    <main>
      <Home />
      <Report />
      <Signup />
      <Signin />
      <AllOfficers />
      <OfficersDetails />
    </main>
  );
};
export default Main;
