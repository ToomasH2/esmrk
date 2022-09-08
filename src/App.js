import "./App.css";
import PeamineLeht from "./components/peamineLeht";
import TereTulemast from "./components/tereTulemast";
import BootstrapTest from "./components/bootstrapTest";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TereTulemast />} />
          <Route path="/peamineLeht" element={<PeamineLeht />} />
          <Route path="/bootstrapTest" element={<BootstrapTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
