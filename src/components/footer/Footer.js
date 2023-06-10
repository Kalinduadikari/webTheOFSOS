import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="about">
          <h4>About Us</h4>
          <p>
            <b>OFSOS</b> is a comprehensive inventory and stock management
            solution designed to help businesses streamline their operations
            and improve efficiency.
          </p>
        </div>
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="contact">
          <h4>Contact Us</h4>
          <p>Email: support@ofsos.com</p>
          <p>Phone: +94 71 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>All rights reserved. &copy; 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
