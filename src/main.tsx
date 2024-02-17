import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/globals.css";
import { DetailsPage } from "./Pages/DetailsPage";
import { RouterError } from "./Components/RouterError";
import { SearchResults } from "./Pages/SearchResults";
import { Layout } from "./Pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouterError />,
    children: [
      {
        index: true,
        element: <SearchResults />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "nasa_id/:nasa_id",
        element: <DetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
