import React from "react";
import "./TopSection.css";

function TopSection() {
  return (
    <div className="top-section">

      {/* LEFT: Logo + Title */}
      <div className="logo">
        <img
          src="https://www.financialexpress.com/wp-content/uploads/2024/11/PM-JDY.jpg"
          alt="Logo"
          className="logo-img"
        />
        <h2>Janlok Pratishthan Sanghatana</h2>
      </div>

      {/* RIGHT: Image */}
      <div className="right-image">
        <img
          src="https://www.bankersadda.com/wp-content/uploads/multisite/2024/08/07160810/quit-india-movement-1.png"
          alt="Right"
        />
      </div>

    </div>
  );
}

export default TopSection;