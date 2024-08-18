import { BiLeftArrow } from "react-icons/bi";
import { createBrowserRouter, Link, Outlet } from "react-router-dom";
import Home from "../../pages/Home";
import ReactQuillEditor from "../../pages/editors/ReactQuill";
import Tiptap from "../../pages/editors/tiptap";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "editor",
    element: (
      <div>
        <Link
          to="/"
          className="text-center flex justify-center items-center gap-2 hover:text-gray-700 transition-all duration-200 text-xl mt-12"
        >
          <BiLeftArrow className="h-4 w-4" />
          Back to Editors
        </Link>
        <Outlet />{" "}
      </div>
    ),
    children: [
      {
        path: "tiptap",
        element: <Tiptap className="h-4 w-4" />,
      },
      {
        path: "react-quill",
        element: <ReactQuillEditor />,
      },
    ],
  },
]);
