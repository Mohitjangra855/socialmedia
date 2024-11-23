import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginHero.css";

const LoginHero = () => {
  const navigate = useNavigate();
  // State to store form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling errors

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation (you can expand this)
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
     
      const data = response;
      if (!response.ok) {
        setError(data.message || "Something went wrong");
        throw new Error(data.message || "Something went wrong");
      }
      navigate("/")
      setPassword("")
    } catch (err) {
      // console.error("Error during login:", error);
      setError(err.message||"An unexpected error occurred")
    }
  };

  return (
    <>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The Lotus Team
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <p>Please login to your account</p>

                        {/* Email Input */}
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Phone number or email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Username
                          </label>
                        </div>

                        {/* Password Input */}
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                        </div>

                        {/* Display Error */}
                        {error && <div style={{ color: "red" }}>{error}</div>}

                        {/* Login Button */}
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          >
                            Log in
                          </button>
                          <a className="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>

                        {/* Create Account */}
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2 mr-2">
                            Don't have an account?
                          </p>
                          <Link to={"/signup"}>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button></Link>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right Side Section */}
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginHero;
