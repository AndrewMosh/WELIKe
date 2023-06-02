import React from "react";
import logo from "./logo.svg";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="prime" variant="dark">
      <Container>
        <Link className="logoLink" to={"/WELIKe"}>
          <div className="size">
            <img width={50} height={40} src={logo} alt="" />
            WELIKe
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {isAuthenticated && (
              <>
                <Link className="link" to={"/officers"}>
                  <li>Ответственный сотрудник</li>
                </Link>
                <Link className="link" to={"/cases/"}>
                  <li>Все кражи</li>
                </Link>
                <Link className="link" to={"/WELIKe"}>
                  <li onClick={handleClick}>Выйти</li>
                </Link>
              </>
            )}
            {
              <>
                <Link className="link" to={"/public/report"}>
                  <li>Сообщить о краже</li>
                </Link>

                {!isAuthenticated && (
                  <>
                    <Link className="link" to={"/auth/sign_in"}>
                      <li>Войти</li>
                    </Link>
                    <Link className="link" to={"/auth/sign_up"}>
                      <li>Регистрация</li>
                    </Link>
                  </>
                )}
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
