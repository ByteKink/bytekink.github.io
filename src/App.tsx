import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Page from "./Page";
import "./styles/custom.scss";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Page />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
