import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
    } catch (error) {}
  };

  return (
    <div id="app-container">
      <form id="login-area" className="card" onSubmit={login}>
        <h2 id="title">Login</h2>
        <div className="form-row">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-input"
            id="username"
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn login-btn"
            style={{ backgroundColor: "purple", color: "white" }}
          >
            Login
          </button>
        </div>
        <div>
          <div className="text-center">
            Not a member yet?{" "}
            <a href="/" className="text-decoration-none">
              Register
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
