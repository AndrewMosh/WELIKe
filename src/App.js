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
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [approved, setApproved] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState(
    localStorage.getItem(localStorage.getItem("admin") || false)
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
        setData(response.data);
        localStorage.setItem("token", response.data.data.token);
        console.log(response);
        if (response.data.data.user.approved === true) {
          setAdmin(!admin);
          localStorage.setItem("admin", true);
        }
        setMessage("");
      })
      .catch((error) => {
        setMessage("Вы ввели неверный логин или пароль");
      });
  };

  return (
    <div className="App">
      <Router>
        <Header admin={admin} setAdmin={setAdmin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="auth/sign_up" element={<Signup />}></Route>
          <Route
            path="auth/sign_in"
            element={
              <Signin
                admin={admin}
                setAdmin={setAdmin}
                data={data}
                setData={setData}
                password={password}
                setPassword={setPassword}
                setEmail={setEmail}
                message={message}
                email={email}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            }
          ></Route>
          <Route
            path="public/report"
            element={<Report admin={admin} />}
          ></Route>
          <Route
            path="/officers"
            element={
              <AllOfficers approved={approved} setApproved={setApproved} />
            }
          ></Route>
          <Route
            path="/cases/"
            element={<Messages approved={approved} setApproved={setApproved} />}
          ></Route>
          <Route
            path="/officers/:id"
            element={
              <AllOfficers approved={approved} setApproved={setApproved} />
            }
          ></Route>
          <Route
            path="/cases/:id"
            element={<Messages approved={approved} setApproved={setApproved} />}
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
