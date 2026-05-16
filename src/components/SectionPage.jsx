import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SectionPage.css";
import Navbar from "./Navbar";  
function SectionPage() {

  const { id } = useParams();

  const [contents, setContents] = useState([]);
  const [section, setSection] = useState(null);

  useEffect(() => {
    fetchSection();
    fetchContents();
  }, [id]);

  // FETCH SECTION NAME
  const fetchSection = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8080/api/sections/${id}`
      );

      setSection(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // FETCH CONTENTS
  const fetchContents = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8080/content/section/${id}`
      );

      setContents(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <>
  <Navbar />
    <div className="section-page">

      {/* TITLE */}
      <div className="section-header">

        <h1>{section?.sectionName}</h1>

        <p>
          Explore all content related to{" "}
          {section?.sectionName}
        </p>

      </div>

      {/* CONTENT GRID */}
      <div className="section-grid">

        {contents.length > 0 ? (

          contents.map((c) => (

            <div
              className="section-card"
              key={c.contentId}
            >

              {/* IMAGE */}
              <img
                src={`http://localhost:8080/api/image/${c.contentImage}`}
                alt={c.contentName}
              />

              {/* BODY */}
              <div className="section-card-body">

                <span className="content-type">
                  {c.contentType}
                </span>

                <h2>{c.contentName}</h2>

                <h4>
                  {c.contentPersonName}
                </h4>

                <p>
                  {c.contentDescription}
                </p>

              </div>

            </div>

          ))

        ) : (

          <div className="empty-content">

            No Content Available

          </div>

        )}

      </div>

    </div>
    </>
  );
}

export default SectionPage;