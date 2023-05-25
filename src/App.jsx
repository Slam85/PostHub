import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <body>
      <RouterProvider router={router} />
    </body>
  );
}

export default App;
