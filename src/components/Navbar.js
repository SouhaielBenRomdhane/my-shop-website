import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // Import Firestore
import logo from "../images/logo.jpeg";

const Navbar = () => {
  const [user, setUser] = useState(null); // Track user authentication state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Unsubscribe from the auth state listener
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning" style={{ paddingLeft: "50px", marginRight: "0px" }}>
      <div className="container-fluid">
        <img
          src={logo}
          height="40"
          width="40"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginRight: "10px" }}
        />
        <Link className="navbar-brand" to="/">
          My Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            {/* Add other navigation links */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/map">
                Géolocalisation
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              {user ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
