import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  //  utilisation du router
  return <RouterProvider router={router} />;
}

export default App;
