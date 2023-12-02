import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import UserManagement from "./UserManagement";
import "./dashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = firebase.firestore().collection("products");
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const addProduct = async () => {
    try {
      await firebase.firestore().collection("products").add(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await firebase.firestore().collection("products").doc(productId).delete();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="a">Admin Dashboard</h1>
      <Row>
        <Col md={6}>
          <Form className="form">
            <Form.Group controlId="productName" className="a">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productDescription" className="a">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productPrice" className="a">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productImage" className="a">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={addProduct}
              style={{ marginTop: "50px" }}
            >
              Add Product
            </Button>
          </Form>
        </Col>

        <Col md={6} className="a">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                {/*<th>Description</th>*/}
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  {/*<td>{product.description}</td>*/}
                  <td>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "50px" }}
                      />
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Link to="/gerer" style={{ textDecoration: "none" }}>
            Managing user accounts
          </Link>
        </Col>
      </Row>
      {/**<Row>
        <Button  style={{marginTop:"10px", width:"100px", marginLeft:"1000px"}} variant="success">Gerer les comptes</Button>
      </Row> */}
    </div>
  );
};

export default AdminDashboard;
