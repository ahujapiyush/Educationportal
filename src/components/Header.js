import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap";

function Header() {
  return (
    <div>
      <Link to="/exampage">Start A Quiz</Link>
    </div>
  );
}

export default Header;
