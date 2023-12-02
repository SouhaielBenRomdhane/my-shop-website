import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // Import Firestore

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Fetch user's role from Firestore 'comptes' collection
      const userDoc = await firebase
        .firestore()
        .collection("comptes")
        .doc(user.email)
        .get();
      const userData = userDoc.data();

      if (userData) {
        const role = userData.role || "user";

        // Redirect based on user role
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/products");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container" style={{marginLeft:"30%",marginBottom:"300px",width:"40%"}}>
      <h1 style={{marginLeft:"35%"}}>Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <div className="mt-3">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
