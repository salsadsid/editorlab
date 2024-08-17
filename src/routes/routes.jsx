import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Tiptap from "../pages/editors/tiptap";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "editor",
    element: (
      <div>
        Editors
        <Outlet />{" "}
      </div>
    ),
    children: [
      {
        path: "tiptap",
        element: <Tiptap />,
      },
    ],
  },
]);
