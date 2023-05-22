import React, { useState } from "react";
import Footer from "../Nav/Footer";
import Login from "../Nav/Login";
import { useNavigate } from "react-router-dom";

function Connection() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const navigate = useNavigate();

  async function handleSubmit() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    setEmail("");
    setPassword("");

    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/login`,
      options
    );

    const data = await response.json();

    console.log(data);

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("token", data.token);

    if (data.success) {
      navigate("/home");
    } else {
      alert("Login Failed");
    }
  }

  return (
    <div className="connection">
      <Login />
      <div className="containerMillieu">
        <div className="container">
          <h1 className="containerTitle">Sign in</h1>
          <div className="bloc1">
            <label htmlFor="">E-mail</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form1"
            ></input>
          </div>
          <div className="bloc1">
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form1"
            ></input>
          </div>
          <div className="buttonValider">
            <button className="btn" onClick={handleSubmit}>
              Log in
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Connection;