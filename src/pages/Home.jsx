import React from "react";
import { BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav className="min-h-screen flex justify-center items-center">
      <ul className="flex flex-col text-2xl gap-5">
        <li>
          <Link
            to={`/editor/tiptap`}
            className="flex justify-center  items-center gap-2 hover:text-gray-700 transition-all duration-200"
          >
            {" "}
            Tiptap
            <BiRightArrow className="h-4 w-4" />
          </Link>
        </li>
        <li>
          <Link
            className="flex justify-center  items-center gap-2 hover:text-gray-700 transition-all duration-200"
            to={`/editor/react-quill`}
          >
            React Quill <BiRightArrow className="h-4 w-4" />
          </Link>
        </li>
        <li>
          <Link
            className="flex justify-center  items-center gap-2 hover:text-gray-700 transition-all duration-200"
            to={`/editor/lexical`}
          >
            Lexical <BiRightArrow className="h-4 w-4" />
          </Link>
        </li>
        <li>
          <Link
            className="flex justify-center  items-center gap-2 hover:text-gray-700 transition-all duration-200"
            to={`/editor/react-markdown`}
          >
            React Markdown <BiRightArrow className="h-4 w-4" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
