import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../pages/App";
import { Page404 } from "../pages/Page404";
import { Home } from "../pages/Home";
import { Details } from "../pages/Details";
import { SearchPage } from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/details/:name", element: <Details /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}