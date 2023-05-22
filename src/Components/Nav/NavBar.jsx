import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Layouts/NavBar.css";
import "../Layouts/Login.css";

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
      alert("Signed In");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="navBar">
      <div className="navBtn">
        {token ? (
          <>
            <button className="btn">
              <Link to="/home" className="btn">
                Home
              </Link>
            </button>
            <div className="connect">
              <button className="btn">
                <Link to="/profile" className="btn">
                  Profile
                </Link>
              </button>
              <button className="btn" onClick={handleSubmit}>
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="btn">
              <Link to="/" className="btn">
                Home
              </Link>
            </button>
            <div className="noConnect">
              <button className="btn">
                <Link to="/register" className="btn">
                  Create account
                </Link>
              </button>
              <button className="btn">
                <Link to="/connection" className="btn">
                  Sign In
                </Link>
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
