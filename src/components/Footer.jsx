import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT SECTION */}
        <div className="footer-section">
          <h2 className="footer-logo">Janlok Pratishthan</h2>

          <p className="footer-description">
            Building a better society with modern technology, transparency,
            and community support.
          </p>
        </div>

        {/* CENTER SECTION */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>

          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/events">Events</a>
            </li>

            <li>
              <a href="/downloads">Downloads</a>
            </li>

            <li>
              <a href="/news">News</a>
            </li>

            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>

          <p>Email: support@janlok.org</p>

          <p>Phone: +91 9876543210</p>

          <p>Pune, Maharashtra, India</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © 2026 Janlok Pratishthan. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;