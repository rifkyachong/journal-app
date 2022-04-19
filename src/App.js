import React from "react";
import Home from "./pages/Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<p>route does not exist</p>} />
      </Routes>
    </BrowserRouter>
  );
}
