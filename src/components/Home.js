import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import slider from "../images/slider.jpeg";
import jaune from "../images/jaunes/1.jpeg";
import rose from "../images/roses/1.jpeg";
import vert from "../images/vertes/1.jpeg";
import { useNavigate } from "react-router-dom";
import "./home.css";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={slider} alt="First slide" />
          {/* Add captions or other content if needed */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "500px", width: "400px" }}
            src={jaune}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "500px", width: "400px" }}
            src={rose}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "500px", width: "400px" }}
            src={vert}
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>

      {/* Paragraph and Button */}
      <div className="container mt-4" style={{ backgroundColor: "#F0F0F0" }}>
        <p>
          Explore our stylish and eco-friendly tote bags collection. Our bags
          are designed for both fashion and functionality, providing ample space
          for your essentials while making a positive impact on the environment.
        </p>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            style={{
              border: "solid  back",
              backgroundColor: "#ffc107",
              color: "black",
              marginLeft: "100px",
              padding: "0px,10px,0px,10px",

              marginBottom: "10px",
            }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
