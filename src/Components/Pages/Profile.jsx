import React, { useEffect, useState } from "react";
import Footer from "../Nav/Footer";
import NavBar from "../Nav/NavBar";
import "../Layouts/Profile.css";
import swal from "sweetalert";

// ON UTILISE USESTATE AFIN DE POUVOIR EDITER ET ENTRER DES INFORMATIONS UTILISATEURS AVEC DES STRINGS
function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  // FONCTION ASYNCHRONE QUI PERMET DE RÉCUPÉRER DEPUIS LE LOCALSTORAGE LES INFORMATIONS DU PROFIL UTILISATEUR
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

    const data = await response.json();
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    // Astuce
    setAge(data.age);
    setOccupation(data.occupation);

    console.log(data);
  }

  //ON RÉCUPÈRE LES INFOS DU PROFIL DANS UN TABLEAU VIDE 
  useEffect(() => {
    getInfoProfil();
  }, []);

  // FONCTION ASYNCHRONE QUI PERMET DE STOCKER LES INFORMATIONS MODIFIÉES DANS LE PROFIL
  async function updateInfoProfil() {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        age: age,
        occupation: occupation,
      }),
    };

    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/user`,
      options
    );

    const data = await response.json();
    console.log(data);
  }

  function handleEditClick() {
    if (isEditing) {
      updateInfoProfil();
    }
    setIsEditing(!isEditing);
  }

  // ON RÉCUPÈRE LES INFORMATIONS MODIFIÉES DU PROFIL DANS LE LOCALSTORAGE GRÂCE À USEEFFECT
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAge(user.age);
      setOccupation(user.occupation);
    } else {
      getInfoProfil();
    }
  }, []);

  // ON AFFICHE SUR LA PAGE LES ÉLÉMENTS NÉCESSAIRES À L'UTILISATEUR POUR AFFICHER SON PROFIL, LE BOUTON DE MODICITON DE SON PROFIL, ET LA PAGE D'ÉDITION DE SON PROFIL
  return (
    <div>
      <NavBar />
      <div className="home">
        {isEditing === false ? (
          <div className="container">
            <div action="" className="bloc1" method="get" />
            <div className="containerInfo">
              <label htmlFor="">Last Name : </label>
              <div className="form1">{lastName}</div>
              <div action="" className="bloc1" method="get" />
              <div>
                <label htmlFor="">First Name : </label>
                <div className="form1">{firstName}</div>
              </div>
              <div action="" className="bloc1" method="get" />{" "}
              <button className="buttonToChangeValid" onClick={handleEditClick}>
                Change
              </button>{" "}
            </div>
          </div>
        ) : isEditing === true ? (
          <div className="container2">
            <div className="backprofils">
              <div className="containerInfoEdit">
                <div className="username">
                  <div className="row">
                    <div action="" method="get">
                      <label htmlFor="">Last Name : </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="lastNameEdit"
                      />
                    </div>
                    <div action="" method="get">
                      <label htmlFor="">First Name : </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="firstNameEdit"
                      />
                    </div>
                    <div action="" method="get">
                      <label htmlFor="">E-mail : </label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="emailEdit"
                      />
                    </div>
                    <div action="" method="get">
                      <label htmlFor="">Tel : </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="emailEdit"
                      />
                    </div>
                    <div action="" method="get">
                      <label htmlFor="">Biography : </label>
                      <input
                        type="text"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="bioEdit"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="buttonToChangeValid"
                  onClick={handleEditClick}
                >
                  OK
                </button>{" "}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
