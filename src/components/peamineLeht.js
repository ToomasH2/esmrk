import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Reminder } from "../elements/remind";
import { onValue, ref, remove } from "firebase/database";
import "../styles/peamineLeht.css";
import { Form } from "react-bootstrap";

export default function PeamineLeht() {
  const navigate = useNavigate();
  const [meeldetuletused, setMeeldetuletused] = useState([]);
  const [kasutaja, setKasutaja] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setKasutaja(user.email);
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          const data = snapshot.val();
          setMeeldetuletused([]);
          if (data != null) {
            Object.values(data).map((meeldetuletus) => {
              setMeeldetuletused((oldArray) => [...oldArray, meeldetuletus]);
            });
          }
        });
      }

      if (!user) {
        navigate("/");
      }
    });
  }, []);

  const logiValja = () => {
    signOut(auth)
      .then(navigate("/"))
      .catch((err) => {
        alert(err.message);
      });
  };

  const kustuta = (todo) => {
    remove(ref(db, `/${auth.currentUser.uid}/${todo.uidd}`));
  };
  return (
    <div>
      <h1> Tere, {kasutaja}!</h1>
      <Reminder />
      {meeldetuletused.map((yks) => (
        <div className="meeldetuletus">
          <h1 className="pealkiri">{yks.title}</h1>
          <p>{yks.reminder}</p>
          <p>{yks.kp}</p>
          <Form>
            {yks.alam.map((alam, i) => (
              <label>
                <input type="checkbox" id={i} value={i} />
                {alam}
                <br />
              </label>
            ))}
          </Form>
          <button onClick={() => kustuta(yks)}>Kustuta</button>
        </div>
      ))}
      <button onClick={logiValja}>Logi valja </button>
    </div>
  );
}
