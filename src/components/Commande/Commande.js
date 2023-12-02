import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Utilisation de useNavigate
import Login from "../Login/Login";

const Commande = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = firestore.collection("commande");
        const snapshot = await ordersRef.get();
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleCancelOrder = async (id) => {
    try {
      await firestore
        .collection("commande")
        .doc(id)
        .update({ status: "cancelled" });

      const updatedOrders = orders.map((order) => {
        if (order.id === id) {
          return { ...order, status: "cancelled" };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handlePayOrder = async (id) => {
    try {
      await firestore.collection("commande").doc(id).update({ status: "paid" });

      const { cardNumber = "", email = "" } = inputValues[id] || {};

      if (email) {
        await firebase.auth().currentUser.sendEmailVerification();
        console.log("Verification email sent to:", email);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  const handleInputChange = (id, field, value) => {
    setInputValues({
      ...inputValues,
      [id]: {
        ...inputValues[id],
        [field]: value,
      },
    });
  };

  return (
    <div className="container" style={{ marginBottom: "250px" }}>
      <h1 style={{ fontFamily: "Roboto", marginLeft: "4%" }}>Orders</h1>
      {user ? (
        <table className="table">
          <thead style={{ fontSize: "20px" }}>
            <tr>
              <td>ID</td>
              <td>Price</td>
              <td>Actions</td>
              <td>State</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.totalPrice} DT</td>
                <td>
                  {order.status !== "cancelled" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel
                    </button>
                  )}
                  {order.status !== "paid" && (
                    <div style={{ marginTop: "20px" }}>
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={inputValues[order.id]?.cardNumber || ""}
                        onChange={(e) =>
                          handleInputChange(
                            order.id,
                            "cardNumber",
                            e.target.value
                          )
                        }
                        style={{ width: "200px", height: "40px" }}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={inputValues[order.id]?.email || ""}
                        onChange={(e) =>
                          handleInputChange(order.id, "email", e.target.value)
                        }
                        style={{
                          width: "200px",
                          height: "40px",
                          marginLeft: "20px",
                        }}
                      />
                      <button
                        className="btn btn-success"
                        onClick={() => handlePayOrder(order.id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Pay
                      </button>
                    </div>
                  )}
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Commande;
