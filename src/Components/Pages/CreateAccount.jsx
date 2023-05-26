import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Nav/Footer";
import NavBar from "../Nav/NavBar";
import "../Layouts/CreateAccount.css";
import swal from "sweetalert";

function CreateAccount() {

  // ON UTILISE USESTATE AFIN DE POUVOIR ENREGISTRER LES INFORMATIONS DE CREATION DE COMPTE : PRÉNOM, NOM, EMAIL, ET MOT DE PASSE, AVEC DES STRINGS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // METHODE POUR SOUMETTRE LES INFORMATIONS DE CREATION DE COMPTE 
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

    // METHODE DE FETCH SUR UNE FONCTION ASYNCHRONE AVEC L'API DU SOCIAL NETWORK POUR PERMETTRE LA NAVIGATION EN MODE CONNECTÉ.E
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

  // ON DEMANDE LES ÉLÉMENTS À AFFICHER SUR LA PAGE POUR QUE L'UTILISATEUR PUISSE ENTRER LES INFORMATIONS NÉCESSAIRES À LA CRÉATION DE SON COMPTE (INPUT ET TEXTE INFORMATIF)
  return (
    <div>
      <NavBar />
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
