import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const navigate = useNavigate(); // For navigation after log out

  // Check for JWT in  Cookies on component mount
  useEffect(() => {
    let token = Cookies.get("token"); // Check if token exists in cookie
    console.log(token,",,")
    if (token) {
      setIsAuthenticated(true); // If token exists, user is authenticated
    }
  }, []);

  const handleLogout = async () => {
    Cookies.remove("token"); // Remove the token from cookie
    setIsAuthenticated(false); // Update the state to reflect the user is not authenticated
    navigate("/"); // Navigate to the home page or login page after log out
  };
  return (
    <div className="navbar">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
        alt="nav_img"
      />
      <ul className="navbar_links">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/new"}>
          <li>New Post</li>
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to={"/login"}>
              <li>Login</li>
            </Link>
            <Link to={"/signup"}>
              <li>Sign Up</li>
            </Link>
          </>
        ) : (
          <li onClick={handleLogout}>Log out</li>
        )}
      </ul>
      <button>Contact Us</button>
    </div>
  );
};

export default Navbar;
