import React, { useState } from "react";
import logo from "../Images/logo.jpg";
import NavBar from "./NavBar";

function Login() {
  async function getInfoProfil() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/user`,
      options
    );
  }

  return (
    <div className="login">
      <img src={logo} alt="logo" className="logo" />
      <div>
        <h1 className="titre">PostHub</h1>
      </div>

      {!localStorage.getItem("token") ? (
        <div className="textNotConnect">
          <NavBar />
        </div>
      ) : (
        <div className="textConnect">
          <h5>Connected</h5>
          <NavBar />
        </div>
      )}
    </div>
  );
}

export default Login;
