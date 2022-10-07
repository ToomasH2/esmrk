import { set, ref } from "firebase/database";
import React from "react";
import { useState } from "react";
import { uid } from "uid";
import { db, auth } from "../firebase-config";
import "../styles/peamineLeht.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Reminder = (props) => {
  const [reminder, setReminder] = useState("");
  const [title, setTitle] = useState("");
  const [kp, setKp] = useState("");
  const [alam, setAlam] = useState(4);
  const [alamEesmargid, setAlamEesmargid] = useState({});
  const lisaAlameesmark = () => {
    setAlam(alam + 1);
  };
  const eemaldaAlameesmark = () => {
    if (alam > 1) {
      setAlam(alam - 1);
    }
  };
  const lisaMeeldetuletus = () => {
    console.log(alamEesmargid);
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      title: title,
      reminder: reminder,
      uidd: uidd,
      kp: kp,
      alam: alamEesmargid,
      taidetud: new Array(alam).fill(false),
      olemas: 0,
    });
    setReminder("");
    props.closer();
  };

  const alamhHandle = (k, l) => {
    setAlamEesmargid({ ...alamEesmargid, [l]: k.target.value });

    console.log(l);
  };

  return (
    <div className="lisaMeeldetuletus p-1 m-1">
      <div className="w-100 mb-1">
        <Form.Group>
          <Form.Control
            as="input"
            style={{ fontSize: 20, width: 20 }}
            size="lg"
            className="w-50 font-size mb-2"
            placeholder="Pealkiri"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
      </div>

      <Form.Group>
        <Form.Control
          as="textarea"
          className="w-100"
          placeholder="Meeldetuletuse sisu"
          type="text"
          value={reminder}
          rows={4}
          onChange={(e) => setReminder(e.target.value)}
        />
      </Form.Group>
      <div className="row">
        <div className="col-md-4 mb-4">
          <Form.Group controlId="dob">
            <Form.Control
              className="mt-1"
              type="date"
              size="sm"
              name="dob"
              value={kp}
              onChange={(e) => setKp(e.target.value)}
            />
          </Form.Group>
        </div>
      </div>
      <h3>Alameesmärgid</h3>
      <div className="alamEesmargid w-100 ">
        {[...Array(alam)].map((e, i) => (
          <div>
            <input
              className="w-75 mb-2"
              key={i}
              placeholder="Alameesmark"
              type="text"
              value={e}
              onChange={(e) => {
                alamhHandle(e, i);
                console.log(i);
              }}
            />
          </div>
        ))}
      </div>
      <div className="w-100">
        <Button className="m-1" size="sm" onClick={lisaAlameesmark}>
          Lisa alameesmark
        </Button>
        <Button size="sm" onClick={eemaldaAlameesmark}>
          Eemalda alameesmark
        </Button>
      </div>
      <div className="d-flex flex-row-reverse">
        <Button
          size="lg"
          variant="success"
          className="w-25 m-3"
          onClick={lisaMeeldetuletus}
        >
          Lisa
        </Button>
      </div>
    </div>
  );
};
export { Reminder };
