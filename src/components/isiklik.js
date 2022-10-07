import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { onValue, ref, remove } from "firebase/database";
import "../styles/peamineLeht.css";
import { useNavigate } from "react-router-dom";
import "../styles/isiklik.css";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { MyNavbar } from "../elements/navbar";

export default function Isiklik() {
  const navigate = useNavigate();
  const [meeldetuletused, setMeeldetuletused] = useState([]);
  const [kasutaja, setKasutaja] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setKasutaja(user.displayName);
      console.log(user);
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
    });
    if (!auth.currentUser.uid) {
      console.log(kasutaja);
      navigate("/login");
    }
  }, []);

  const logiValja = () => {
    signOut(auth)
      .then(navigate("/login"))
      .catch((err) => {
        alert(err.message);
      });
  };

  const navig = () => {
    navigate("/peamineleht");
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <MyNavbar kasutaja={kasutaja} />

      <div className="tervitus p-3 m-3">
        <h1 className="m-3">Tere, {kasutaja}!</h1>
        <h3>Sul on </h3>
        <h2>{meeldetuletused.length} </h2>
        {meeldetuletused.length == 1 ? (
          <>
            {" "}
            <h3>aktiivne eesmärk.</h3>
          </>
        ) : (
          <>
            {" "}
            <h3>aktiivset eesmärki.</h3>
          </>
        )}
        <Button
          onClick={navig}
          variant="success"
          className="w-25 mt-5"
          size="lg"
          active
        >
          Vaata
        </Button>{" "}
        <Button
          onClick={logiValja}
          variant="outline-dark"
          className=" m-3"
          size="sm"
        >
          Logi välja
        </Button>{" "}
      </div>
    </div>
  );
}
