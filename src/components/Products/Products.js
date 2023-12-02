import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/compat/app";
import { firestore } from "../../firebase";
import "./products.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0); // Nombre de produits dans le panier

  useEffect(() => {
    // Fetch products from Firebase Firestore
    const fetchProducts = async () => {
      try {
        const productsRef = firebase.firestore().collection("products");
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          quantity: 1, // Initialize quantity for each product
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      // Add product to cart collection in Firestore
      await firestore.collection("cart").add({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image, // Include image link in the cart
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setCartItems([...cartItems, product]); // Update cart locally
      console.log("Product added to cart:", product.name);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Update quantity of a product
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
  };
  const fetchCartItems = async () => {
    try {
      const cartRef = firebase.firestore().collection("cart");
      const snapshot = await cartRef.get();
      const cartData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(cartData);
      setCartItemsCount(cartData.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  fetchCartItems();

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">
        Our Products{" "}
        <Link to="/cart" style={{ color: "#ffc107" }}>
          <span className="cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} /> ({cartItemsCount} )
          </span>
        </Link>
      </h1>
      <div
        className="mb-4 d-flex justify-content-center"
        style={{ marginLeft: "100px" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h5>Prix:</h5>
                <p className="card-text">{product.price} DT</p>
                <div className="input-group mb-3">
                  <div className="quantity">
                    <input
                      type="number"
                      className="form-control"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                  style={{ marginTop: "30px" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
