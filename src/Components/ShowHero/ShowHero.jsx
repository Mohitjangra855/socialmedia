import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ShowHero.css";
const ShowHero = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/show/${id}`);
        const data = await response.json();
        setPost(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }
  const imageUrl =
    post.image?.url ||
    "https://images.unsplash.com/photo-1731466450638-959a6f0d1514?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8";
  const handleDelete = async () => {
    try {
      let response = await fetch(`http://localhost:8080/show/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Post deleted successfully");
        navigate("/");
      } else {
        alert("Failed to delete the post");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="container-child">
        <h1>{post.title}</h1>
        <img src={imageUrl} alt={post.title} className="img-fluid" />
        <p>
          <strong>Content:</strong> {post.content}
        </p>
        <p>
          <strong>Description:</strong> {post.description}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="show-button">
          <button className="btn btn-success text-secondary">
            <Link
              className="text-decoration-none"
              to={`/show/${post._id}/edit`}
            >
              Edit
            </Link>
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowHero;
