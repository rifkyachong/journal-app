import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext";
import { StatusCodes } from "http-status-codes";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(AuthContext);

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      if (response.status === StatusCodes.CREATED) {
        const { username, token } = response.data;
        setUser(username);
        setToken(token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(error);
    }
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
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
