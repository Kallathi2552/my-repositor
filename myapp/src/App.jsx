import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import User from "./pages/User";
import Product from "./pages/Product";
import Feedback from "./pages/Feedback";
import Admin from "./pages/Admin";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.remove(theme === "light" ? "dark" : "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/product" element={<Product />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}