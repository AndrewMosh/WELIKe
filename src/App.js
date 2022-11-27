import "./App.css";
import Header from "./Components/Header/Header";
import { useState } from "react";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./Components/Signup/Signup";
import { Home } from "./Components/Home/Home";
import { Signin } from "./Components/Signin/Signin";
import { Report } from "./Components/Report/Report";
import { AllOfficers } from "./Components/AllOfficers/AllOfficers";
import { Messages } from "./Components/Messages/Messages";

function App() {
  const [isAuth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [worker, setWorker] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div>
      <Router>
        <Header
          isAuth={isAuth}
          setAuth={setAuth}
          admin={admin}
          setAdmin={setAdmin}
          worker={worker}
          setWorker={setWorker}
          data={data}
          setData={setData}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="auth/sign_up" element={<Signup />}></Route>
          <Route
            path="auth/sign_in"
            element={
              <Signin
                isAuth={isAuth}
                setAuth={setAuth}
                admin={admin}
                setAdmin={setAdmin}
                worker={worker}
                setWorker={setWorker}
                data={data}
                setData={setData}
              />
            }
          ></Route>
          <Route
            path="public/report"
            element={<Report isAuth={isAuth} setAuth={setAuth} />}
          ></Route>
          <Route path="/officers" element={<AllOfficers />}></Route>
          <Route path="/cases/" element={<Messages />}></Route>
          <Route path="/officers/:id" element={<AllOfficers />}></Route>
          <Route path="/cases/:id" element={<Messages />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
