import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Start from "./pages/Start";
import { useState } from "react";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Private from "./pages/Private";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"  element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;