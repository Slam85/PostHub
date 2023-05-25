import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Footer from "../Nav/Footer";
import NavBar from "../Nav/NavBar";
import "../Layouts/navStyle.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

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
      swal(data.message);
    }
  }

  useEffect(() => {
    getAllPost();
  }, []);

  async function addComment(postId, commentText) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId: postId,
        content: commentText,
      }),
    };

    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/post-hub/post/comment`,
      options
    );
    const data = await response.json();

    if (data.success) {
      getAllPost();
    } else {
      swal(data.message);
    }
  }

  async function getAllPost() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/post-hub/posts?page=0&limit=10",
      options
    );
    const data = await response.json();

    if (data.success) {
      setAllPosts(data.posts);
    } else {
      swal(data.message);
    }
  }

  useEffect(() => {
    getAllPost();
  }, []);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleInputChange2(e) {
    setInputTitle(e.target.value);
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

  async function postPosts(e) {
    e.preventDefault();

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
      swal(data.message);
    }
  }

  const renderMyPosts = () => {
    return allPosts.map((item) => {
      return (
        <div className="divHomeContainer" key={item._id}>
          <div className="homeContainer">
            <p className="titreBloc">{item.title}</p>
            <p className="contenuBloc">{item.content}</p>
            <p className="author">
              By: {item.firstname} {item.lastname}
            </p>
            <div className="likes">
              <a
                className="my-anchor-element"
                data-tooltip-content="J'aime"
                data-tooltip-place="bottom"
              >
                <button className="buttonLike" onClick={() => like(item._id)}>
                  ❤️
                </button>{" "}
              </a>
              <Tooltip anchorSelect=".my-anchor-element" />
              <span>{item.likes.length}</span>
            </div>
            <div className="comments">
              <form
                className="commentsContainer"
                onSubmit={(e) => {
                  e.preventDefault();
                  const commentText = e.target.comment.value;
                  addComment(item._id, commentText);
                  e.target.reset();
                }}
              >
                <input
                  className="inputComment"
                  type="text"
                  name="comment"
                  placeholder="Ajouter un commentaire"
                />
                <button className="commentBtn" type="submit">
                  Comment
                </button>
              </form>
            </div>
            <div className="displayComments">
              {item.comments &&
                item.comments.map((comment) => (
                  <div className="pComments" key={comment._id}>
                    {comment.content}
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="App">
        <NavBar />
        <div className="containerHome">
          <form className="formCreate" onSubmit={postPosts}>
            <input
              type="text"
              value={inputTitle}
              onChange={handleInputChange2}
              placeholder="Post Title"
              className="form1"
            />
            <div className="textComment">
              <input
                type="text"
                rows="5"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Post Text"
                className="createPost"
              />
              <button type="submit" className="posterButton">
                Submit
              </button>
            </div>
          </form>
        </div>
        {renderMyPosts()}
      </div>
      <Footer />
    </>
  );
}

export default HomeConnect;
