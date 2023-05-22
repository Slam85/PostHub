import React, { useEffect, useState } from "react";
import Footer from "../Nav/Footer";
import Login from "../Nav/Login";
import "../Layouts/Profile.css";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);

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

    console.log(data);
  }

  useEffect(() => {
    getInfoProfil();
  }, []);

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    } else {
      getInfoProfil();
    }
  }, []);

  return (
    <div>
      <Login />
      <div className="home">
        {isEditing === false ? (
          <div className="container">
            <h1 className="pageTitle">Profile</h1>
            <div action="" className="bloc1" method="get" />
            <label htmlFor="">Lastname : </label>
            <div className="form1">{lastName}</div>
            <div action="" className="bloc1" method="get" />
            <div>
              <label htmlFor="">Firstname : </label>
              <div className="form1">{firstName}</div>
            </div>
            <div action="" className="bloc1" method="get" />{" "}
            <div>
              <label htmlFor="">E-mail : </label>
              <div className="form1">{email}</div>
            </div>
            <div action="" className="bloc1" method="get" />{" "}
            <button className="buttonToChangeValid" onClick={handleEditClick}>
              Change
            </button>{" "}
          </div>
        ) : isEditing === true ? (
          <div className="container">
            <h1 className="pageTitle">Profile</h1>

            <div action="" className="bloc1" method="get">
              <label htmlFor="">Lastname : </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form1"
              />
            </div>

            <div className="bloc1">
              <div action="" method="get" className="bloc1">
                <label htmlFor="">Firstname : </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form1"
                />
              </div>

              <div className="bloc1">
                <div action="" method="get" className="bloc1">
                  {" "}
                  <label htmlFor="">E-mail : </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form1"
                  />
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
