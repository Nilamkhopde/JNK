import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ add this
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import "./Admin.css";

export default function AdminAuth() {

  const [view, setView] = useState("login");
  const navigate = useNavigate(); // ✅

  return (
    <div className="admin-page">

      <div className="admin-container">

        {/* ❌ CLOSE BUTTON */}
        <button
          className="close-btn"
          onClick={() => navigate("/")}  // 👉 redirect to home
        >
          ✖
        </button>

        <h2 className="admin-title">Admin Panel</h2>

        {/* Toggle Buttons */}
        <div className="admin-tabs">
          <button
            className={view === "login" ? "active" : ""}
            onClick={() => setView("login")}
          >
            Login
          </button>

          <button
            className={view === "register" ? "active" : ""}
            onClick={() => setView("register")}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        <div className="admin-form-box">
          {view === "login" ? (
            <AdminLogin switchView={setView} />
          ) : (
            <AdminRegister switchView={setView} />
          )}
        </div>

      </div>

    </div>
  );
}