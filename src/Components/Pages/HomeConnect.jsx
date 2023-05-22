import React, { useState } from "react";
import { useEffect } from "react";
import Footer from "../Nav/Footer";
import "../Layouts/navStyle.css";
import Search from "../Nav/Search";

function HomeConnect() {
  const [inputValue, setInputValue] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [array, setArray] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [allPosts, setAllPosts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function like(postId) {
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

    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/post/like`,
      options
    );
    const data = await response.json();
    setFirstName(data.firstname);
    setLastName(data.lastname);

    if (data.success) {
      getAllPost();
    } else {
      alert(data.message);
    }
  }

  useEffect(() => {
    getAllPost();
  }, []);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  function handleInputChange2(event) {
    setInputTitle(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    postPosts();
    setInputValue("");
    setInputTitle("");
  }

  async function getInfoProfil() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/user`,
      options
    );

    const data = await response.json();
  }
  useEffect(() => {
    getInfoProfil();
  }, []);

  async function postPosts() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: inputTitle,
        content: inputValue,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/post-hub/post",
      options
    );
    const data = await response.json();
    if (data.success) {
      getAllPost();
    } else {
      alert(data.message);
    }
  }

  const renderMyPosts = () => {
    return allPosts.map((item, index) => {
      return (
        <div key={index}>
          <div className="homeContainer">
            <p className="contenuBloc">{item.title}</p>
            <p className="contenuBloc">{item.content}</p>
            <p className="author">
              {" "}
              Author : {item.firstname} {item.lastname}
            </p>
            <button className="buttonLike" onClick={() => like(item._id)}>
              ❤️
            </button>{" "}
            <span>{item.likes.length}</span>
          </div>
        </div>
      );
    });
  };

  async function getAllPost() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/post-hub/posts?page=0&limit=10",
      options
    );
    let data = await response.json();

    setAllPosts(data.posts);
  }

  return (
    <div className="App">
      <Search />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="bloc2">
            <div className="posts">
              <input
                type="text"
                value={inputTitle}
                onChange={handleInputChange2}
                placeholder="Post Title"
                className="form1"
              />
              <input
                type="text"
                rows="5"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Post Text"
                className="createPost"
              />
            </div>
          </div>
          <button
              type="submit"
              onClick={handleSubmit}
              className="posterButton"
            >
              Poster
            </button>
        </form>

        <div className="form2">
          <div action="" method="get" className="bloc1">
            {renderMyPosts()}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomeConnect;
