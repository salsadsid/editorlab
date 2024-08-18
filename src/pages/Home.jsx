import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav className="min-h-screen flex justify-center items-center">
      <ul className="flex flex-col text-2xl gap-5">
        <li>
          <Link to={`/editor/tiptap`}>Tiptap</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
