import "./App.css";
import PeamineLeht from "./components/peamineLeht";
import TereTulemast from "./components/tereTulemast";
import BootstrapTest from "./components/bootstrapTest";
import Tere from "./components/tere";

import Isiklik from "./components/isiklik";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./elements/footer";

function App() {
  const logiValja = () => {};
  return (
    <div>
      <Router>
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Tere />} />
            <Route path="/login" element={<TereTulemast />} />
            <Route path="/peamineLeht" element={<PeamineLeht />} />
            <Route path="/bootstrapTest" element={<BootstrapTest />} />
            <Route path="/isiklik" element={<Isiklik />} />
          </Routes>
        </div>
      </Router>
      <h1>asdasd</h1>
      <Footer />
    </div>
  );
}

export default App;
