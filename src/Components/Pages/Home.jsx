import React, { useState, useEffect } from "react";
import Footer from "../Nav/Footer";
import NavBar from "../Nav/NavBar";
import "../Layouts/navStyle.css";
import swal from "sweetalert";

function Home() {
  const [allPosts, setAllPosts] = useState([]);

  async function like(postId) {
    console.log(postId);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId: postId,
      }),
    };
    console.log("option", options);

    await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/post/like`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          getAllPost();
        } else {
          swal(data.message);
        }
      });
  }

  const renderMyPosts = () => {
    if (allPosts.length >= 0) {
      return allPosts.slice(0, 4).map((item, index) => {
        return (
          <div key={index}>
            <div className="homeContainer">
              <p className="titreBloc">{item.title}</p>
              <p className="contenuBloc">{item.content}</p>
              <div className="likes">
                <button className="buttonLike" onClick={() => like(item._id)}>
                  ♥︎
                </button>{" "}
                <span>{item.likes.length}</span>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  async function getAllPost() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/posts?page=0&limit=10`,
      options
    );
    const data = await response.json();
    setAllPosts(data.posts);

    console.log(data.posts);
  }

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="container">{renderMyPosts()}</div>
      <div></div>
      <Footer />
    </div>
  );
}

export default Home;
