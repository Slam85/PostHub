import React, { useState, useEffect } from "react";
import Footer from "../Nav/Footer";
import NavBar from "../Nav/NavBar";
import "../Layouts/navStyle.css";
import swal from "sweetalert";

// LA PAGE D'ACCUEIL HORS CONNEXION, QUI N'AFFICHE QUE LE CONTENU DES POSTS ET LE NOMBRE DE LIKES, SANS LES COMMENTAIRES NI LA POSSIBILITÉ DE LIKER OU COMMENTER
function Home() {
  // ON CRÉÉ UN TABLEAU VIDE GRÂCE À USESTATE AFIN DE STOCKER LES POSTS DEDANS POUR POUVOIR LES AFFICHER SUR LA PAGE D'ACCUEIL
  const [allPosts, setAllPosts] = useState([]);

  // FONCTION ASYNCHRONE AVEC L'API DU SOCIAL NETWORK QUI PERMET DE STOCKER LES POSTS DANS LE LOCAL STORAGE POUR LES RÉCUPÉRER AFIN DE LES AFFICHER SUR LA PAGE HOME
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

  // FONCTION QUI PERMET D'AFFICHER LES POSTS - ON UTILISE DES PROPS AFIN DE RÉCUPÉRER LES ÉLÉMENTS QUI CONSTITUENT LE POST COMME LE TITRE, LE CONTENU, AINSI QUE LES LIKES AJOUTÉS
  const renderMyPosts = () => {
    if (allPosts.length >= 0) {
      // utilisation de slice pour ne pas encombrer la page et récupérer 4 posts
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

  // FONCTION QUI PERMET DE RÉCUPÉRER LES POSTS DEPUIS LE LOCAL STORAGE GRÂCE À L'API
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

  // ON AFFICHE ENFIN LES POSTS SUR LA PAGE D'ACCUEIL HORS CONNEXION GRÂCE À LA RENDERMYPOSTS
  return (
    <div className="App">
      <NavBar />
      <div className="containerApp">{renderMyPosts()}</div>
      <div></div>
      <Footer />
    </div>
  );
}

export default Home;
