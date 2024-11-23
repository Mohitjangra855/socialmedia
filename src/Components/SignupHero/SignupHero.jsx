import React, { useState } from "react";
import "./SignupHero.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // State to store form values
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setErr("Please fill out all fields.");
      return;
    }
    // API call to create user
    try {
      let response = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });
      let data = await response.json();
      if (!response.ok) {
        setErr(data.message || "ssignup is failed!");
        throw setErr(data.message || "Oops,No Internet Connection!");
      }
      navigate("/");
    } catch (error) {
      setErr(error.message || "something went wrong....");
    }
  };

  return (
    <section className="text-center text-lg-start">
      {/* Jumbotron */}
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
              className="card cascading-right bg-body-tertiary"
              style={{ backdropFilter: "blur(30px)" }}
            >
              <div className="card-body signup-card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      placeholder="User name"
                      type="text"
                      id="form3Example2"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example2">
                      User name
                    </label>
                  </div>

                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <input
                      placeholder="Enter your email"
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <input
                      placeholder="Password"
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign up
                  </button>
                  <p className="text-warning">{err}</p>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              className="w-60 rounded-4 shadow-4 SignUp_img"
              alt="SignUp Illustration"
            />
          </div>
        </div>
      </div>
      {/* Jumbotron */}
    </section>
  );
};

export default SignUp;
