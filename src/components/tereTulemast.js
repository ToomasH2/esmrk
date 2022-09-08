import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
import { useNavigate } from "react-router-dom";

export default function TereTulemast() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registreerib, setRegistreerib] = useState(false);
  const navigate = useNavigate(false);
  const [regInfo, setRegInfo] = useState({
    remail: "",
    confirmRemail: "",
    rpassword: "",
    confirmRpassword: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/peamineLeht");
      }
    });
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/peamineLeht");
      })
      .catch((err) => alert(err.message));
  };

  const looKasutaja = () => {
    if (
      regInfo.remail !== regInfo.confirmRemail ||
      regInfo.rpassword !== regInfo.confirmRpassword
    ) {
      alert("Viga e-maili v6i salas6na sisestamisel");
      return;
    }
    createUserWithEmailAndPassword(auth, regInfo.remail, regInfo.rpassword)
      .then(() => {
        navigate("/peamineLeht");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="App">
      <h1>Rakendus</h1>
      <div className="login-container">
        {registreerib ? (
          <>
            <input
              className="emailReg"
              placeholder="e-mail"
              value={regInfo.remail}
              onChange={(e) =>
                setRegInfo({ ...regInfo, remail: e.target.value })
              }
            />
            <input
              className="emailReg"
              placeholder="korda e-mail"
              value={regInfo.confirmRemail}
              onChange={(e) =>
                setRegInfo({ ...regInfo, confirmRemail: e.target.value })
              }
            />
            <input
              className="salas6naReg"
              placeholder="valisalas6na"
              value={regInfo.rpassword}
              onChange={(e) =>
                setRegInfo({ ...regInfo, rpassword: e.target.value })
              }
            />
            <input
              className="salas6naReg"
              placeholder="korda oma Salas6na"
              value={regInfo.confirmRpassword}
              onChange={(e) =>
                setRegInfo({ ...regInfo, confirmRpassword: e.target.value })
              }
            />
            <button className="registreerimine" onClick={looKasutaja}>
              {" "}
              Registreeri{" "}
            </button>
            <button onClick={() => setRegistreerib(false)}>Tagasi </button>
          </>
        ) : (
          <>
            <input
              className="email"
              placeholder="E-mail"
              onChange={handleEmailChange}
              value={email}
            />
            <input
              className="salas6na"
              placeholder="salas6na"
              onChange={handlePasswordChange}
              value={password}
            />
            <button className="sisselogimine" onClick={handleSignIn}>
              Logi sisse
            </button>
            <button onClick={() => setRegistreerib(true)}>
              Registreeri selle asemel kasutaja
            </button>
          </>
        )}
      </div>
    </div>
  );
}
