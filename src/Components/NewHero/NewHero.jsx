import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewHero.css";

const NewHero = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    content:"",
    image: { url: "" }, // Keep the image as an object
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      if (!data.title || !data.description || !data.image.url||!data.content) {
        throw new Error("Please fill all the fields");
      }

      const response = await fetch("http://localhost:8080", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Oops! No internet connection");
      }

      navigate("/"); // Navigate to `/` first
    } catch (error) {
      setErr(error.message); // Set the error message to be displayed
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      // Update the image URL inside the image object
      setData((prevData) => ({ ...prevData, image: { url: value } }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <div>
      <div className="container">
      {/* Form for editing the post */}
      <form className="new-form" onSubmit={handleSubmit}>
        <h2>Create New   Post</h2>

        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          className="form-control"
          id="title"
          name="title"
          type="text"
          value={data.title }
          onChange={handleChange}
          required
        />
        <label htmlFor="content" className="form-label">
          Content:
        </label>
        <input
          className="form-control"
          name="content"
          id="content"
          type="text"
          value={data.content}
          onChange={handleChange}
          required
        />

        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          className="form-control"
          type="text"
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="image" className="form-label">Image url:</label>
        <input type="text" id="image" 
        name="image" className="form-control" value={data.image.url} onChange={handleChange} />
        <button className="btn" type="submit">
          Post
        </button>
      </form>

      {err && <div className="error">{err}</div>}
    </div>
    </div>
  );
};

export default NewHero;
