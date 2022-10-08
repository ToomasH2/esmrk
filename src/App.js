import "./App.css";
import PeamineLeht from "./components/peamineLeht";
import TereTulemast from "./components/tereTulemast";
import BootstrapTest from "./components/bootstrapTest";
import Tere from "./components/tere";

import Isiklik from "./components/isiklik";
import { HashRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./elements/footer";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Tere />} />
          <Route path="/login" element={<TereTulemast />} />
          <Route path="/peamineLeht" element={<PeamineLeht />} />
          <Route path="/bootstrapTest" element={<BootstrapTest />} />
          <Route path="/isiklik" element={<Isiklik />} />
        </Routes>
      </Router>
      <h1>asdasd</h1>
      <Footer />
    </div>
  );
}

export default App;
