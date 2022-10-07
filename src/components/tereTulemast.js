import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
import { useNavigate } from "react-router-dom";
import "../styles/tereTulemast.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyNavbar } from "../elements/navbar";

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
    eesnimi: "",
    perekonnanimi: "",
  });

  /* useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/isiklik");
      }
    });
  });*/

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/isiklik");
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

    createUserWithEmailAndPassword(
      auth,
      regInfo.remail,
      regInfo.rpassword
    ).then(() => {
      const user = auth.currentUser;
      console.log("a");
      console.log(user);
      console.log(regInfo.eesnimi);

      updateProfile(user, {
        displayName: regInfo.eesnimi,
      }).then(() => {
        navigate("/isiklik");
      });
    });
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <MyNavbar />
      <div className=" loginkonteiner">
        <div className="konteinerk">
          {registreerib ? (
            <>
              <div className="konteiner">
                <h1 className="pealkiri">Uue kasutaja registreerimine</h1>
                <div className="nimed w-75 m-1">
                  <input
                    className="w-50 "
                    id="name"
                    placeholder="Eesnimi"
                    value={regInfo.eesnimi}
                    onChange={(e) =>
                      setRegInfo({ ...regInfo, eesnimi: e.target.value })
                    }
                  />
                  <input
                    className="w-50"
                    placeholder="Perekonnanimi"
                    value={regInfo.perekonnanimi}
                    onChange={(e) =>
                      setRegInfo({ ...regInfo, perekonnanimi: e.target.value })
                    }
                  />
                </div>
                <input
                  className="emailReg w-75 m-1"
                  placeholder="E-mail"
                  value={regInfo.remail}
                  onChange={(e) =>
                    setRegInfo({ ...regInfo, remail: e.target.value })
                  }
                />

                <input
                  className="emailReg w-75 m-1"
                  placeholder="Korda E-maili"
                  value={regInfo.confirmRemail}
                  onChange={(e) =>
                    setRegInfo({ ...regInfo, confirmRemail: e.target.value })
                  }
                />
                <input
                  className="salas6naReg w-75 m-1"
                  placeholder="Vali salasõna"
                  type="password"
                  value={regInfo.rpassword}
                  onChange={(e) =>
                    setRegInfo({ ...regInfo, rpassword: e.target.value })
                  }
                />
                <input
                  className="salas6naReg w-75 m-1"
                  type="password"
                  placeholder="Korda salasõna"
                  value={regInfo.confirmRpassword}
                  onChange={(e) =>
                    setRegInfo({ ...regInfo, confirmRpassword: e.target.value })
                  }
                />
                <Button className=" w-50 my-2" onClick={looKasutaja}>
                  {" "}
                  Registreeri{" "}
                </Button>
                <a
                  className=" my-1"
                  href="#"
                  onClick={() => setRegistreerib(false)}
                >
                  Logi sisse{" "}
                </a>
              </div>
            </>
          ) : (
            <>
              <Container className=" logiSisse">
                <h1 className="mb-3">Tere tulemast!</h1>

                <input
                  className="email w-75 "
                  placeholder="E-mail"
                  onChange={handleEmailChange}
                  value={email}
                />
                <input
                  className="salas6na w-75 my-1"
                  placeholder="Salasõna"
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <Button
                  className="sisselogimine w-75 my-3"
                  onClick={handleSignIn}
                >
                  Logi sisse
                </Button>
                <div>
                  <a href="#" onClick={() => setRegistreerib(true)}>
                    Registreeri selle asemel kasutaja
                  </a>
                </div>
              </Container>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
