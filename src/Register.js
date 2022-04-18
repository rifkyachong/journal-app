import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", {
        username,
        email,
        password,
      });
    } catch (error) {}
  };

  return (
    <div id="app-container">
      <form id="register-area" className="card" onSubmit={register}>
        <h2 id="title">Register</h2>
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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
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
            className="btn register-btn"
            style={{ backgroundColor: "purple", color: "white" }}
          >
            Register
          </button>
        </div>
        <div>
          <div className="text-center">
            Already have an account?{" "}
            <a href="/" className="text-decoration-none">
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
