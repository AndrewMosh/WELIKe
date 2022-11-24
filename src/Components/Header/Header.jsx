import React from "react";
import logo from "./logo.svg";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="prime" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="size">
          <img width={50} height={40} src={logo} alt="" />
          Velik
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link className="color" href="#deets">
              Сообщить о краже
            </Nav.Link>
            <Nav.Link className="color" href="#deets">
              Регистрация
            </Nav.Link>
            <Nav.Link className="color" eventKey={2} href="#memes">
              Войти
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
