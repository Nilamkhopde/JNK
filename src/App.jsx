import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TopSection from "./components/TopSection";
import FormSec from "./components/FormSec";
import AdminAuth from "./components/AdminAuth";
import AdminDashboard from "./components/AdminDashboard";
import Loader from "./components/Loader";



// ✅ PAGES
import Users from "./components/Users";
import Section from "./components/Section";
import Content from "./components/Content";
import SectionPage from "./components/SectionPage";
import DownloadsPage from "./components/DownloadsPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ================= HOME ================= */
function Home() {
  return (
    <>
      <Header />
      <TopSection />
   <Navbar />
      <FormSec />
    </>
  );
}

/* ================= APP ================= */
function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  // ✅ SHOW LOADER FIRST
  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>

    


      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin" element={<AdminAuth />} />

        <Route
  path="/downloads"
  element={<DownloadsPage />}
/>

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* OPTIONAL ROUTES */}
        <Route path="/users" element={<Users />} />
        <Route path="/section" element={<Section />} />
        <Route path="/content" element={<Content />} />
<Route
  path="/section/:id"
  element={<SectionPage />}
/>

      </Routes>

      {/* GLOBAL TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

    </BrowserRouter>
  );
}

export default App;

















// import React from "react";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import TopSection from "./components/TopSection";
// import FormSec from "./components/FormSec";
// import AdminAuth from "./components/AdminAuth";
// import AdminDashboard from "./components/AdminDashboard";


// // ✅ PAGES
// import Users from "./components/Users";
// import Section from "./components/Section";
// import Content from "./components/Content";

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// /* ================= HOME ================= */
// function Home() {
//   return (
//     <>
//       <Header />
//       <TopSection />
//       <Navbar />
//       <FormSec />
//     </>
//   );
// }

// /* ================= APP ================= */
// function App() {
//   return (
//     <BrowserRouter>

//       <Routes>n

//         {/* HOME */}
//         <Route path="/" element={<Home />} />

//         {/* ADMIN LOGIN */}
//         <Route path="/admin" element={<AdminAuth />} />

//          {/* ONLY THIS */}
//   <Route path="/dashboard" element={<AdminDashboard />} />

//       </Routes>

//       {/* GLOBAL TOAST */}
//       <ToastContainer position="top-right" autoClose={2000} />

//     </BrowserRouter>
//   );
// }

// export default App;




















