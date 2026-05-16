import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader-card">

        <div className="spinner"></div>

        <h2 className="loader-title">Loading...</h2>

        <p className="loader-text">
          Please wait while we prepare your dashboard
        </p>

      </div>
    </div>
  );
}

export default Loader;