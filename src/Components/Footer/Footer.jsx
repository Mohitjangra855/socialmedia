import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          
          alt="footer_img"
        />
        <p>Copyright © 2024 GNews API.All Rights Reserved.</p>
      </div>
      <div className="footer-right">
        <div className="footer-right-ul1">
            <li className="first_li">Navigation</li>
            <li>Documention</li>
            <li>Pricing</li>
            <li>FAQ</li>
            <li>About Us</li>
        </div>
        <div className="footer-right-ul2">
            <li className="first_li">Company</li>
            <li>Terms of Services</li>
            <li>Privacy policy</li>
        </div>
      </div>
    </div>
  );
};

export default Footer;
