import React, { useState } from "react";
import "../../styles/navbar.css";
import { Link, NavLink } from "react-router-dom";

const MyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        Home
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/userprofile">User Profile</NavLink>
        </li>
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
        <li>
          <NavLink to="/breathe">Breathe</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MyNavbar;