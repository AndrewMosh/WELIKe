import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Signup } from "./Components/Signup/Signup";
import { Signin } from "./Components/Signin/Signin";
import { Home } from "./Components/Home/Home";
import { Report } from "./Components/Report/Report";
import { AllOfficers } from "./Components/AllOfficers/AllOfficers";
import { Messages } from "./Components/Messages/Messages";

const router = createBrowserRouter([
  {
    path: "/WELIKe",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "auth/sign_up",
    element: (
      <>
        <Header />
        <Signup />
        <Footer />
      </>
    ),
  },
  {
    path: "auth/sign_in",
    element: (
      <>
        <Header />
        <Signin />
        <Footer />
      </>
    ),
  },
  {
    path: "public/report",
    element: (
      <>
        <Header />
        <Report />
        <Footer />
      </>
    ),
  },
  {
    path: "/officers",
    element: (
      <>
        <Header />
        <AllOfficers />
        <Footer />
      </>
    ),
  },
  {
    path: "/cases/",
    element: (
      <>
        <Header />
        <Messages />
        <Footer />
      </>
    ),
  },
  {
    path: "/officers/:id",
    element: (
      <>
        <Header />
        <AllOfficers />
        <Footer />
      </>
    ),
  },
  {
    path: "/cases/:id",
    element: (
      <>
        <Header />
        <Messages />
        <Footer />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback="loading">
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
