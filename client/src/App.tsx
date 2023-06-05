import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnvironmentQuestion from "./pages/environmentQuestion.js";
import MitigationQuestion from "./pages/mitigationQuestion.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnvironmentQuestion />} />
        <Route path="/2" element={<MitigationQuestion />} />
      </Routes>
    </Router>
  );
};

export default App;
