import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Layouts/NavBar.css";
import Swal from "sweetalert2";
import swal from "sweetalert";

//confirmer si l'utilisateur veut rester connecté ou pas
function NavBar() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    let reponse = confirm("Sign Out?");
    if (reponse == true) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      //si oui, il supprime le token, email et le mot de passe du localStorage
      navigate("/");
    } else {
      //si non, il affiche une message
      Swal.fire({
        title: "Great!! You continue with us!!",
        width: 600,
        padding: "3em",
        background: "#fff ",
        backdrop: `
          rgba(197, 202, 201, 0.45)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
    }
  };

  //ici, on dit que le token est disponible dans le localStorage
  const token = localStorage.getItem("token");

  return (
    <div className="navLogin">
      <img src={"./posthub.png"} alt="logo" className="logoComplet" />
      <nav className="navBar">
        <div className="navButtons">
          {/* ici le token et vérifié. Se dans localStorage il y a un token enregistré, alors on est connecté et les buttons Profille et Sign Out s'affichent*/}
          {token ? (
            <div className="connect">
              <Link to="/home" className="btnHome">
                Home
              </Link>
              <Link to="/profile" className="btnProfile">
                Profile
              </Link>
              <button className="btnSignOut" onClick={handleSubmit}>
                Sign Out
              </button>
            </div>
          ) : (
            ({
              /* sinon, l'utilisateur n'est pas connecté et alors les buttons create account et sign in s'affichent*/
            },
            (
              <div className="noConnect">
                <Link to="/" className="btnHome">
                  Home
                </Link>
                <Link to="/register" className="btnHome">
                  Create account
                </Link>
                <Link to="/connection" className="btnHome">
                  Sign In
                </Link>
              </div>
            ))
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
