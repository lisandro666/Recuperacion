import Historial from "./Routes/Historial";
import Home from "./Routes/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Historial" element={<Historial />} />
      </Routes>
    </div>
  );
}

export default App;
