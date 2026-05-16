import React from "react";
import { FaFacebook, FaTwitter, FaGooglePlay } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <header className="header">

      <div className="left">
        <span>Privacy</span>
        <span>Terms</span>
      </div>

      <div className="center">
        <span className="visits">Total Visits: 12345</span>

        <select className="lang">
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>
      </div>

      <div className="right">
        <FaFacebook className="icon" />
        <FaTwitter className="icon" />
        <FaGooglePlay className="icon" />

        <button className="register-btn">
          Free Registration
        </button>
      </div>

    </header>
  );
}

export default Header;