import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#ffc107",
    color: "black",
    paddingTop: "20px",
    textAlign: "center",
    position: "relative",
  };

  const lineStyle = {
    position: "relative",
    width: "100%",
    height: "5px",
    backgroundImage: "linear-gradient(to right, #00bcd4, #ff9800)",
  };

  const lineBeforeAfterStyle = {
    content: '""',
    position: "absolute",
    top: "0",
    height: "5px",
    width: "50%",
    background: "inherit",
  };

  return (
    <footer style={footerStyle}>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-6">
            <h5 style={{}}>My SHop</h5>
          </div>
          <div className="col-lg-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              {/* Add more links */}
            </ul>
          </div>
          <div className="col-lg-3">
            <h5>Contact</h5>
            <p>Email: myshop@gmail.com</p>
            <p>Phone: +21650073754</p>
          </div>
        </div>
      </div>
      {/* Lines */}
      <div style={lineStyle}>
        <div style={{ ...lineBeforeAfterStyle, left: "0" }}></div>
        <div style={{ ...lineBeforeAfterStyle, right: "0" }}></div>
      </div>
    </footer>
  );
};

export default Footer;
