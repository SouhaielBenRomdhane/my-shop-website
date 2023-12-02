import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { firestore } from "../../firebase";
import logo from "../../images/logo.jpeg";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection("contact").add(formData);
      setShowConfirmation(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container>
      <h2>Contact Us</h2>
      <Row>
        <Col lg={6} md={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {showConfirmation && (
            <Alert variant="success" className="mt-3">
              Your message has been sent successfully!
            </Alert>
          )}
        </Col>
        <Col lg={6} md={12}>
          <img
            src={logo}
            alt="Logo"
            style={{
              marginLeft: "25%",
              marginBottom: "25%",
              height: "auto",
              maxWidth: "75%",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
