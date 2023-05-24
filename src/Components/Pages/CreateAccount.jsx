import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Nav/Footer";
import NavBar from "../Nav/NavBar";
import "../Layouts/CreateAccount.css";
import swal from "sweetalert";

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [bio, setBio] = useState("");

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
        bio: bio,
        tel: tel,
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
              <div>
                <label className="labelCreate" htmlFor="">
                  Tel
                </label>
                <input
                  type="text"
                  className="inputLastNameCreate"
                  id="Prenom"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
              <div>
                <label className="labelCreate" htmlFor="">
                  Bio
                </label>
                <input
                  type="text"
                  className="inputLastNameCreate"
                  id="Prenom"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
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
