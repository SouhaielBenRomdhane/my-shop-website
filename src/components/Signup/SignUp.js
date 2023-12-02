import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Link } from "react-router-dom";

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [nom, setNom] = useState(""); // Ajout de l'état pour le nom
  const [error, setError] = useState(null);
  const [inscriptionValidee, setInscriptionValidee] = useState(false); // État pour le message de validation

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Utiliser l'email comme ID du document dans Firestore
      await firebase.firestore().collection("comptes").doc(email).set({
        email: email,
        role: role,
        nom: nom,
      });

      setInscriptionValidee(true);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div
      className="container"
      style={{ marginLeft: "30%", marginBottom: "100px", width: "40%" }}
    >
      <h1 style={{ marginLeft: "35%" }}>Sign Up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {inscriptionValidee && (
        <div className="alert alert-success">
          Inscription validée ! {/* Message à afficher */}
        </div>
      )}
      <form onSubmit={handleSignUp} style={{}}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            id="nom"
            placeholder="Entrez votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Select Role
          </label>
          <select
            className="form-select"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
      <div className="mt-3">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
