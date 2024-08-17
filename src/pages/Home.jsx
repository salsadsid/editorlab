import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/editor/tiptap`}>Tiptap</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
