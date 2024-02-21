import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./css/globals.css";
import { DetailsPage } from "./Pages/DetailsPage";
import { RouterError } from "./Components/RouterError";
import { SearchResults } from "./Pages/SearchResults";
import { Layout } from "./Pages/Layout";
import { ThemeProvider } from "providers/ThemeProvider";
import { rootPath } from "utils/rootPath";

const router = createBrowserRouter([
  {
    path: rootPath,
    element: <Layout />,
    errorElement: <RouterError />,
    children: [
      {
        index: true,
        element: <SearchResults />,
        loader: () => {
          return redirect(`${rootPath}search`);
        },
      },
      {
        path: `${rootPath}search`,
        element: <SearchResults />,
      },
      {
        path: `${rootPath}nasa_id/:nasa_id`,
        element: <DetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
