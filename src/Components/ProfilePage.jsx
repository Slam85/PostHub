import React, { useState, useEffect } from "react";
import Post from "./Post";

const ProfilePage = ({ userId, onLogout }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/user/${userId}`
    )
      .then((response) => response.json())
      .then((data) => setPosts(data.posts))
      .catch((error) => console.log(error));
  }, [userId]);

  return (
    <div>
      <h2>Profile Page</h2>
      <button onClick={onLogout}>Logout</button>
      <h3>Recent Posts</h3>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProfilePage;
