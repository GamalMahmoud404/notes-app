import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false); // حالة الوضع المظلم

  // toggle الوضع المظلم
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route path="/home" element={<Home darkMode={darkMode} />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>

        <Footer darkMode={darkMode} />
      </Router>
    </div>
  );
}

export default App;