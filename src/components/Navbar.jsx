
// import { useNavigate } from "react-router-dom";
// import "./Navbar.css";
// import React, { useState, useEffect } from "react";

// function Navbar() {
//   const [active, setActive] = useState("Home");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const [sections, setSections] = useState([]);

//   const menu = [
//     "Home", "Admin"
   
//   ];
//   useEffect(() => {
//   fetchSections();
// }, []);

// const fetchSections = async () => {
//   try {
//     const res = await axios.get("http://localhost:8080/api/sections");
//     setSections(res.data);
//   } catch (err) {
//     console.log(err);
//   }
// };


//   const handleClick = (item) => {
//     setActive(item);
//     setMenuOpen(false);


//     // 🔥 Navigation handling
//     if (item === "Admin") navigate("/admin");
//     else if (item === "Home") navigate("/");
//     else navigate(`/${item.toLowerCase().replace(" ", "-")}`);
//   };

//   return (
//     <nav className="navbar">
      
//       <div className="logo" onClick={() => navigate("/")}>
//         Janlok
//       </div>

//       <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//         ☰
//       </div>
// <ul className={menuOpen ? "nav-list open" : "nav-list"}>
//   {menu.map(item => (
//     <li key={item} onClick={()=>handleClick(item)}>
//       {item}
//     </li>
//   ))}

//   {/* 🔥 DYNAMIC SECTIONS */}
//   {sections.map(s => (
//     <li key={s.id} onClick={()=>navigate(`/section/${s.id}`)}>
//       {s.sectionName}
//     </li>
//   ))}
// </ul>

//     </nav>
//   );
// }

// export default Navbar; 




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

 const menu = [
  "Home",
  "Downloads",
  "Admin"
];

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/sections"
      );

      setSections(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <nav className="navbar">

      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        Janlok
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <ul className={menuOpen ? "nav-list open" : "nav-list"}>

        {menu.map((item) => (

          <li
            key={item}
            onClick={() =>
              navigate(

  item === "Home"
    ? "/"
    : item === "Downloads"
    ? "/downloads"
    : "/admin"

)
            }
          >
            {item}
          </li>

        ))}

        {/* DYNAMIC SECTION */}

        {sections.map((s) => (

          <li
            key={s.id}
            onClick={() =>
              navigate(`/section/${s.id}`)
            }
          >
            {s.sectionName}
          </li>

        ))}

      </ul>

    </nav>
  );
}

export default Navbar;