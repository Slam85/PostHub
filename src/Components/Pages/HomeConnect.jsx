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

  //ici, on sauvegarde dans l'API le like pour chaque post, en verifiant si l'utilisateur est connecté (sinon il ne pourra pas faire like sur un post)
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
  //useEffect pour mettre a jour les info de la page concernante les likes par post
  useEffect(() => {
    getAllPost();
  }, []);

  // function pour être possible d'ajouter des commentaires aux post et de les sauvegarder dans l'API
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

  // function pour pusher tous les post de l'API pour être possible de les afficher après sur le feed
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

  //useEffect pour mettre a jour les info de la page concernante les posts ajoutées dans l'API
  useEffect(() => {
    getAllPost();
  }, []);

  //ici nous obtenons la valeur d'input où nous écrivons le commentaire
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }
  //ici nous obtenons la valeur d'input où nous écrivons le titre du commentaire
  function handleInputChange2(e) {
    setInputTitle(e.target.value);
  }

  //function pour récuperer le profile de l'utilisateur à partir de l'API
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

  //function pour envoyer les posts vers l'API. Ici est véerifié si l'utilisateur est connecté ou pas, pour être possible de enrengistré le post dans l'API
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
  //mise en forme du render des Posts avec les commentaires et likes inclus
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
                  ♥︎
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

  //mise en forme de l'affichage de la page pour poster
  return (
    <>
      <NavBar />
      <div className="App">
        <div className="containerHome2">
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
