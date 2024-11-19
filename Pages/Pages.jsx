import React, { useState, createContext, useEffect } from "react";
export const newsContext = createContext();
const Pages = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((res) => setData(res.articles));
      
  });
  return <div></div>;
};

export default Pages;
