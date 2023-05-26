import React, { useState } from "react";
import Footer from "../Nav/Footer";
import "../Layouts/navStyle.css";
import "../Layouts/CreateAccount.css";
import "../Layouts/NavBar.css";
import NavBar from "../Nav/NavBar";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Connection() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const navigate = useNavigate();


  // qui va permettre de recupérer les donnné et attente des donné du fecth et les envoyer
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

    // Colis/ Information de la réponse
    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/login`,
      options
    );

    const data = await response.json();

    console.log(data);
    // enregistrement des donnees du navigateur
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("token", data.token);
    // si les données importe son correct alors message (sweet alert et connection) sinon swal error e
    if (data.success) {
      swal("Welcome!", "You are connected!", "success");
      navigate("/home");
    } else {
      swal("Sign in failed!", "Confirm e-mail and/or password", "error");
    }
  }

  return (
    <div className="connection">
      {/*appel du compoment  navBar */}
      <NavBar />
      <div className="containerMillieu">
        <div className="containerLogin">
          <div className="displayLogin">
            <label htmlFor="" className="textLogin">
              E-mail
            </label>
            {/* recupération valeur qui envoie dans tableau useState */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputEmailLogin"
            ></input>
            <div className="bloc1">
              <label htmlFor="" className="textLogin">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputPasswordLogin"
              ></input>
              {/* button qui au click permet d'envoyer les donnnées pour permettre la connectino */}
              <div>
                <button className="btnValiderLogin" onClick={handleSubmit}>
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Connection;
