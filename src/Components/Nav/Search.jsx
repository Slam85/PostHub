import React, { useState } from "react";
import logo from "../Images/logo.jpg";
import NavBar from "../Nav/NavBar";
import "../Layouts/Search.css";

function Search() {
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
    <div className="search">
      {/* <img src={'./logo.png'} alt="logo" className="logo" /> */}
      <img src={'./posthub.png'} alt="logo" className="logoComplet" />
      <div>
      </div>

      {!localStorage.getItem("token") ? (
        <div className="textNotConnect">
          <NavBar />
        </div>
      ) : (
        <div className="textConnect">
          <NavBar />
        </div>
      )}
    </div>
  );
}

export default Search;
