import React from "react";
import "./EditHero.css";
const Temp = () => {
  return (
    <div className="container">
      <form className="edit-form">
       <h2>Edit Post</h2>
        <label htmlFor="title" className="form-label">Title:</label>
        <input type="text" className="form-control" />
        <label htmlFor="content" className="form-label">Content:</label>
        <input type="text" className="form-control" />
        <label htmlFor="" className="form-label">Description:</label>
        <input type="text" className="form-control" />
        <label className="form-label">Image:</label><br/>
        <img
          src="https://images.unsplash.com/photo-1516315720917-231ef9acce48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBIb21lJTIwVGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D"
          alt="edit_image"
        />
        <br />
        <label htmlFor="" className="form-label">Image url:</label>
        <input type="text" className="form-control" />
        <button className="btn">Edit</button>
      </form>
    </div>
  );
};

export default Temp;
