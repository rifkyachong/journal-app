import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Login from "./Login";

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
