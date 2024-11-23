import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditHero.css";

const EditHero = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the post ID from the URL
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  // Fetch post data when the component mounts (and when `id` changes)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/show/${id}`); // Use correct API URL
        if (!response.ok) {
          return setErr("plz fill all fileds!")
        }
        const result = await response.json();
        setData(result.data); // Set the post data when fetch is successful
      } catch (error) {
        setErr(error.message); // Set error message if something goes wrong
      }
    };

    fetchData(); // Trigger fetch on component mount or when `id` changes
  }, [id]);

  // Handle loading and errors
  if (err) {
    return <div>Error: {err}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  // Handle saving the edited post
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent page reload
    if(!data.title||!data.description||!data.content||!data.image.url){
      throw new Error("plz fill all fields");
    }
    try {
      let response = await fetch(`http://localhost:8080/show/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update the post");
      }
      // Redirect to the show page of the post after saving
      navigate(`/show/${id}`);
    } catch (error) {
      setErr(error.message);
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
    <div className="container">
      {/* Form for editing the post */}
      <form className="edit-form" onSubmit={handleSave}>
        <h2>Edit Post</h2>

        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          className="form-control"
          id="title"
          name="title"
          type="text"
          value={data.title || ""}
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
          value={data.content || ""}
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
          value={data.description || ""}
          onChange={handleChange}
          required
        />
        <label className="form-label">Image:</label><br/>
        <img
          src="https://images.unsplash.com/photo-1516315720917-231ef9acce48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBIb21lJTIwVGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D"
          alt="edit_image"
        />
        <br />
        <label htmlFor="image" className="form-label">Image url:</label>
        <input type="text" id="image" 
        name="image" className="form-control" value={data.image.url} onChange={handleChange} />
        <button className="btn" type="submit">
          Edit
        </button>
      </form>

      {err && <div className="error">{err}</div>}
    </div>
  );
};

export default EditHero;
