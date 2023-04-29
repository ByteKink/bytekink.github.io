import React from "react";
import { HashRouter, RouterProvider, createHashRouter } from "react-router-dom";
import Page from "./Page";
import "./styles/custom.scss";

const router = createHashRouter([
  {
    path: "/*",
    element: <Page />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
