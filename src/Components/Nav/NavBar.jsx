import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Layouts/NavBar.css";
import swal from "sweetalert";

function NavBar() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    let reponse = confirm("Sign Out?");
    if (reponse == true) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      navigate("/");
    } else {
      swal("Signed In");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="navBar">
      <div className="navBtn">
        {token ? (
          <>
            {/* <button className="btnHome"> */}
            <Link to="/home" className="btnHome">
              Home
            </Link>
            {/* </button> */}
            <div className="connect">
              {/* <button className="btn"> */}
              <Link to="/profile" className="btnProfile">
                Profile
              </Link>
              {/* </button> */}
              <button className="btnSignOut" onClick={handleSubmit}>
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            {/* <button className="btn"> */}
            <Link to="/" className="btnHome">
              Home
            </Link>
            {/* </button> */}
            <div className="noConnect">
              {/* <button className="btn"> */}
              <Link to="/register" className="btnHome">
                Create account
              </Link>
              {/* </button> */}
              {/* <button className="btn"> */}
              <Link to="/connection" className="btnHome">
                Sign In
              </Link>
              {/* </button> */}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
