import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "./Components/Nav/Error";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Nav/Footer";
import NavBar from "./Components/Nav/NavBar";
import Connection from "./Components/Pages/Connection";
import Profile from "./Components/Pages/Profile";
import CreateAccount from "./Components/Pages/CreateAccount";
import HomeConnect from "./Components/Pages/HomeConnect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <HomeConnect />,
    errorElement: <Error />,
  },
  {
    path: "/connection",
    element: <Connection />,
    errorElement: <Error />,
  },

  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <CreateAccount />,
    errorElement: <Error />,
  },
  {
    path: "/navbar",
    element: <NavBar />,
    errorElement: <Error />,
  },
  {
    path: "/footer",
    element: <Footer />,
    errorElement: <Error />,
  },
]);
