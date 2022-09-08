import { set, ref } from "firebase/database";
import React from "react";
import { useState, toString } from "react";
import { uid } from "uid";
import { db, auth } from "../firebase-config";
import "../styles/peamineLeht.css";
import { Form } from "react-bootstrap";

const Reminder = () => {
  const [reminder, setReminder] = useState("");
  const [title, setTitle] = useState("");
  const [kp, setKp] = useState("");
  const [alam, setAlam] = useState(4);
  const [alamEesmargid, setAlamEesmargid] = useState({});
  const lisaAlameesmark = () => {
    setAlam(alam + 1);
  };
  const eemaldaAlameesmark = () => {
    setAlam(alam - 1);
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
    });
    setReminder("");
  };

  const alamhHandle = (k, l) => {
    setAlamEesmargid({ ...alamEesmargid, [l]: k.target.value });

    console.log(l);
  };

  return (
    <div className="lisaMeeldetuletus">
      <input
        placeholder="meeldetuletuse pealkiri"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="meeldetuletus"
        type="text"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />

      <div className="row">
        <div className="col-md-4">
          <Form.Group controlId="dob">
            <Form.Label>Kuup2ev</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={kp}
              onChange={(e) => setKp(e.target.value)}
            />
          </Form.Group>
        </div>
      </div>
      <div className="alamEesmargid">
        {[...Array(alam)].map((e, i) => (
          <input
            key={i}
            placeholder="alameesmark"
            type="text"
            value={e}
            onChange={(e) => {
              alamhHandle(e, i);
              console.log(i);
            }}
          />
        ))}
      </div>
      <button onClick={lisaAlameesmark}>Lisa alameesmark</button>
      <button onClick={eemaldaAlameesmark}>Eemalda alameesmark</button>
      <button onClick={lisaMeeldetuletus}>Lisa</button>
    </div>
  );
};
export { Reminder };
