import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  const [err, setErr] = useState("");
  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8080/*")
        .then((res) => res.json())
        .then((result) => setErr(result))
        .catch((e) => setErr(e));
    }
    fetchData()
  });
  return (
    <div className="container">
      <h1 style={{fontSize:"5rem"}}>{err.message}</h1>
      <Link to={"/"} style={{fontSize:"2rem"}}>Go to Home Page...</Link>
    </div>
  );
};

export default ErrorPage;
