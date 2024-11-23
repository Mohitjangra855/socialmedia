import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { all_PostContext } from "../../App.js";
import "./HomerHero.css"
const HomeHero = () => {
  const allPosts = useContext(all_PostContext); // Assuming this comes from the context
console.log(allPosts)
  // Check if `allPosts.data` is an array (this is important if the data might be null/undefined initially)
  if (!Array.isArray(allPosts.data)) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  // If there are no posts or empty array, show a message
  if (allPosts.length === 0) {
    return <div>No posts available</div>;
  }

  // Once we have posts, we can map over them safely
  return (
    <div className="home_card row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 mt-3 ml-5">
      {allPosts.data.map((post) => (
        <Link to={`/show/${post._id}`} className="post-link" key={post._id}>
          <div className="card col post-card" style={{ width: "18rem" }}>
            <img
              src={post.image.url}
              className="card-img-top"
              alt="post_image"
              style={{ height: "10rem" }}
            />
            <div className="card-img-overlay"></div>
            <div className="card-body">
              <p className="card-text">
                <b>
                  {post.title}
                </b>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomeHero;
