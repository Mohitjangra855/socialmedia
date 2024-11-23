import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import New from "./Pages/New";
import Show from "./Pages/Show";
import Edit from "./Pages/Edit";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
export const all_PostContext = createContext();
const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <all_PostContext.Provider value={data}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="/show/:id/edit" element={<Edit />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </all_PostContext.Provider>
  );
};

export default App;
