import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Nav/Footer";
import Search from "../Nav/Search";
import "../Layouts/CreateAccount.css";

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
      }),
    };
    console.log("option", options);

    await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/register`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/connection");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div>
      <Search />
      <div className="bodyAccount">
        <div className="container">
          <h1 className="containerTitle">Create Account</h1>
          <form action="" className="mx-auto" method="post">
            <div className="bloc1">
              <label htmlFor="">Lastname</label>
              <input
                type="text"
                className="form1"
                id="Nom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="bloc1">
              <label htmlFor="">Firstname</label>
              <input
                type="text"
                className="form1"
                id="Prenom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="bloc1">
              <label htmlFor="">E-mail</label>
              <input
                type="email"
                className="form1"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="bloc1">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="form1"
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit} className="buttonInscription">
              Create Account
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateAccount;
