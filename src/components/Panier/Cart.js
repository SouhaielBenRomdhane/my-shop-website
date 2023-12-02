import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { firestore } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from Firestore
    const fetchCartItems = async () => {
      try {
        const cartRef = firebase.firestore().collection("cart");
        const snapshot = await cartRef.get();
        const cartData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(cartData);
        calculateTotalPrice(cartData);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();

    // Check if user is authenticated
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setAuthError(false); // Reset auth error if user is authenticated
    } else {
      setAuthError(true); // Set auth error if user is not authenticated
    }
  }, [user]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      await firestore
        .collection("cart")
        .doc(id)
        .update({ quantity: newQuantity });
      const updatedItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await firestore.collection("cart").doc(id).delete();
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handlePlaceOrder = async () => {
    if (user) {
      try {
        const orderData = cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }));

        await firestore.collection("commande").add({
          items: orderData,
          totalPrice,
        });

        console.log("Commande passée avec succès!");
        navigate("/commande"); // Navigate to orders page after placing order
      } catch (error) {
        console.error("Erreur lors du passage de la commande :", error);
      }
    } else {
      setAuthError(true);
      navigate("/login"); // Set auth error if user is not authenticated
    }
  };
  return (
    <div className="container" style={{ marginBottom: "200px" }}>
      <h1 className="text-center mt-4 mb-4">Cart</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price} DT</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    style={{ width: "70px" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="text-center mb-4"
        style={{ marginTop: "50px", marginLeft: "50px" }}
      >
        <h3 style={{ color: "green" }}>Total Price: {totalPrice} DT</h3>
        <button
          className="btn btn-success"
          style={{ width: "200px", marginRight: "10px" }}
          onClick={handlePlaceOrder}
        >
          Make Order
        </button>
        <Link
          to="/commande"
          className="btn btn-primary"
          style={{ width: "200px" }}
        >
          Check Orders
        </Link>
      </div>
    </div>
  );
};

export default Cart;
