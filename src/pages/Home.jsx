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
            React Markdown{" "}
            <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white py-1.5 px-3 rounded-full text-xs shadow-lg transform transition-all duration-500 ease-in-out  hover:brightness-110 hover:animate-pulse active:animate-bounce">
              Gemini AI
            </button>{" "}
            <BiRightArrow className="h-4 w-4" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
