import React, { useState } from "react";
import Comment from "./Comment";

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/like/${post.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleComment = (commentText) => {
    fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/comment/${post.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment: commentText }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data.comment]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={handleLike}>Like</button>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <CommentForm onComment={handleComment} />
    </div>
  );
};

export default Post;
