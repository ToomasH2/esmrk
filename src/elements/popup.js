import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { Reminder } from "./remind";
import "../styles/peamineLeht.css";

const Popup = () => {
  const [naita, setNaita] = useState(false);

  const handleClose = () => setNaita(false);
  const handleShow = () => setNaita(true);

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Lisa eesmark
      </Button>
      <Modal dialogClassName="modal-90w" show={naita} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Uus eesmark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Reminder closer={handleClose}></Reminder>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export { Popup };
