import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { onValue, ref, remove, update } from "firebase/database";
import "../styles/peamineLeht.css";
import { Form, Card, Container, Col } from "react-bootstrap";
import { Popup } from "../elements/popup";
import { ProgressBar } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { MyNavbar } from "../elements/navbar";
import DateCountdown from "react-date-countdown-timer";

export default function PeamineLeht() {
  const navigate = useNavigate();
  const [meeldetuletused, setMeeldetuletused] = useState([]);
  const [kasutaja, setKasutaja] = useState("");
  const [olemas, setOlemas] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setKasutaja(user.displayName);
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
        navigate("/login");
      }
    });
  }, []);

  const taidetud = (i, yks) => {
    const akk = yks.taidetud;
    akk[i] = !akk[i];
    update(ref(db, `/${auth.currentUser.uid}/${yks.uidd}`), {
      taidetud: akk,
      olemas: akk.filter((x) => x == true).length,
    });
  };

  const kustuta = (todo) => {
    remove(ref(db, `/${auth.currentUser.uid}/${todo.uidd}`));
  };
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <MyNavbar kasutaja={kasutaja} />

      <div fluid className=" konteineris">
        <div className="meeldetuletusteKonteineris">
          {meeldetuletused.map((yks, n) => (
            <div key={n} className=" meeldetuletuseKonteiner">
              <div className="prygi">
                <h1 as="h3" className="">
                  {yks.title}
                </h1>
                <Trash3Fill className="m-3" onClick={() => kustuta(yks)} />
              </div>
              <div className="d-flex ">
                <div className="w-50 piir">
                  <p>{yks.reminder}</p>
                </div>
                <div className="w-50">
                  <Form>
                    {yks.alam.map((alam, i) => (
                      <div id={i} key={i} className=" m-1">
                        <label id={i}>
                          <input
                            className="m-1"
                            type="checkbox"
                            id={i}
                            checked={meeldetuletused[n].taidetud[i]}
                            onChange={(e) => taidetud(e.target.id, yks)}
                          />
                          {meeldetuletused[n].taidetud[i] ? (
                            <>
                              <s className="">{alam}</s>
                              <br />
                            </>
                          ) : (
                            <>{alam}</>
                          )}
                        </label>
                      </div>
                    ))}
                  </Form>
                </div>
              </div>
              <p>{yks.kp}</p>
              <ProgressBar
                variant="danger"
                now={(yks.olemas / yks.taidetud.length) * 100}
              />
              <p>
                {yks.olemas}/{yks.taidetud.length}
              </p>
            </div>
          ))}
        </div>
        <Container className="s">
          <div className="lisa">
            <h2>
              Lisa uus
              <br />
              eesmärk
            </h2>

            <p className="w-75">asdasd asdasd asdasd as asdasd asd asda asda</p>
            <Popup className="nupp popup" />
          </div>
        </Container>
      </div>
    </div>
  );
}
