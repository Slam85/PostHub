import React, { useEffect, useState } from "react";
import Footer from "../Nav/Footer";
import NavBar from "../Nav/NavBar";
import "../Layouts/Profile.css";
import swal from "sweetalert";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");

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
    setAge(data.age);
    setOccupation(data.occupation);

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
          <div className="container">
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
                      <label htmlFor="">Age : </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="emailEdit"
                      />
                    </div>
                    <div action="" method="get">
                      <label htmlFor="">Occupation : </label>
                      <input
                        type="text"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="emailEdit"
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
