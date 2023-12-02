import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products/Products";
import ContactUs from "./components/Contact/ContactUs";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar";

import SignUp from "./components/Signup/SignUp";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Cart from "./components/Panier/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import Blog from "./components/Blog/Blog";
import Footer from "./components/Footer";
import GeolocationMap from "./components/Localisation/Localisation";
import UserManagement from "./components/Admin/UserManagement";
import "./App.css";
import Commande from "./components/Commande/Commande";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/map" element={<GeolocationMap />} />
        <Route path="/gerer" element={<UserManagement />} />

        <Route path="/commande" element={<Commande />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
