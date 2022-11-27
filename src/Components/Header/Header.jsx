import React from "react";
import logo from "./logo.svg";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ isAuth, setAuth, admin, setAdmin, data }) => {
  const handleClick = () => {
    if (data.data.user.approved === true) {
      setAdmin(!admin);
    }

    setAuth(!isAuth);
    localStorage.removeItem("token");
    console.log(data.data.user.approved);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="prime" variant="dark">
      <Container>
        <Link className="logoLink" to={"/"}>
          <div className="size">
            <img width={50} height={40} src={logo} alt="" />
            Velik
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {admin && isAuth && (
              <>
                <Link className="link" to={"/officers"}>
                  <li>Ответственный сотрудник</li>
                </Link>
                <Link className="link" to={"/cases/"}>
                  <li>Все кражи</li>
                </Link>
              </>
            )}
            <Link className="link" to={"/public/report"}>
              <li>Сообщить о краже</li>
            </Link>

            {(!isAuth && (
              <>
                <Link className="link" to={"/auth/sign_up"}>
                  <li>Регистрация</li>
                </Link>
                <Link className="link" to={"/auth/sign_in"}>
                  <li>Войти</li>
                </Link>
              </>
            )) || (
              <>
                <li style={{ cursor: "default" }}>{data.data.user.email}</li>
                <Link className="link" to={"/"}>
                  <li onClick={handleClick}>Выйти</li>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
