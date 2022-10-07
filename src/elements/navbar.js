import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/tereTulemast.css";
import { auth } from "../firebase-config";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = (props) => {
  const nav = useNavigate();
  const navigeeri = () => {
    console.log("siik");
    nav("/isiklik");
  };
  return (
    <div className="navbar">
      <Navbar className="navi">
        <Container>
          <Navbar.Brand className="mb-3" href="#">
            Eesmärk
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown className="mb-3" title={props.kasutaja}>
              <NavDropdown.Item onClick={navigeeri}>Avaleht</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export { MyNavbar };
