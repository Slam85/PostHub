import React, { useEffect, useState } from "react";
import Footer from "../Nav/Footer";
import NavBar from "../Nav/NavBar";
import "../Layouts/Profile.css";
import swal from "sweetalert";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
<<<<<<< HEAD
  const [tel, setTel] = useState("");
  const [bio, setBio] = useState("");
=======
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
>>>>>>> main

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
<<<<<<< HEAD
    setBio(data.bio);
    setTel(data.tel);
=======
    setAge(data.age);
    setOccupation(data.occupation);
>>>>>>> main

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
<<<<<<< HEAD
        bio: bio,
        tel: tel,
=======
        age: age,
        occupation: occupation,
>>>>>>> main
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
<<<<<<< HEAD
      setBio(user.bio);
      setTel(user.tel);
=======
      setAge(user.age);
      setOccupation(user.occupation);
>>>>>>> main
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
<<<<<<< HEAD
            <div action="" className="bloc1" method="get" />{" "}

            <div>
              <label htmlFor="">Bio: </label>
              <div className="form1">{bio}</div>
            </div>

            <div action="" className="bloc1" method="get" />{" "}
            <button className="buttonToChangeValid" onClick={handleEditClick}>
              Change
            </button>{" "}
          </div>
        ) : isEditing === true ? (
          <div className="container">
            <div className="backprofils" >
              <h1 className="pageTitle">Profile</h1>
              <div className="username">
                <div className="row">
                  <div className="bloc1">
                    <div action="" className="bloc1" method="get">
                      <label htmlFor="">Lastname : </label>
=======
          </div>
        ) : isEditing === true ? (
          <div className="container2">
            <div className="backprofils">
              <div className="containerInfoEdit">
                <div className="username">
                  <div className="row">
                    <div action="" method="get">
                      <label htmlFor="">Last Name : </label>
>>>>>>> main
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
<<<<<<< HEAD
                        className="form1"
                      />
                    </div>
                  </div>
                  <div className="bloc1">
                    <div action="" method="get" className="bloc1">
                      <label htmlFor="">Firstname : </label>
=======
                        className="lastNameEdit"
                      />
                    </div>
                    <div action="" method="get">
                      <label htmlFor="">First Name : </label>
>>>>>>> main
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
<<<<<<< HEAD
                        className="form1"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="bloc1">
                    <div action="" method="get" className="bloc1">
                      {" "}
=======
                        className="firstNameEdit"
                      />
                    </div>
                    <div action="" method="get">
>>>>>>> main
                      <label htmlFor="">E-mail : </label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
                        className="form1"
                      />
                    </div>
                  </div>
                  <div className="bloc1">
                    <div action="" method="get" className="bloc1">
                      {" "}
                      <label htmlFor="">Tel : </label>
                      <input
                        type="tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        className="form1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bloc1">
                <div action="" method="get" className="bloc1">
                  {" "}
                  <label htmlFor="">Bio: </label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="form1"
                  />
=======
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
>>>>>>> main
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
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
