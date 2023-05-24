import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Nav/Footer";
import Login from "../Nav/Login";
import "../Layouts/CreateAccount.css";
import swal from "sweetalert";

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
          swal(data.message);
        }
      });
  };

  return (
    <div>
      <Login />
      <div className="bodyAccount">
        <div className="container">
          <div className="divCreate">
            <form action="" method="post">
              <label className="labelCreate" htmlFor="">
                First Name
              </label>
              <input
                type="text"
                className="inputFirstNameCreate"
                id="Nom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div>
                <label className="labelCreate" htmlFor="">
                  Last Name
                </label>
                <input
                  type="text"
                  className="inputLastNameCreate"
                  id="Prenom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <label className="labelCreate" htmlFor="">
                E-mail
              </label>
              <input
                type="email"
                className="inputEmailCreate"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <label className="labelCreate" htmlFor="">
                  Password
                </label>
                <input
                  type="password"
                  className="inputPasswordCreate"
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="divButtonCreate">
                <button className="buttonInscription" onClick={handleSubmit}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateAccount;
