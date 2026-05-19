import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DownloadsPage.css";
import Navbar from "./Navbar";

function DownloadsPage() {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/files/getAllFiles"
      );

      setFiles(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const handleDownload = (id) => {

    window.open(
      `http://localhost:8080/api/files/download/${id}`,
      "_blank"
    );

  };

  return (
<>
    <Navbar/>
    <div className="downloads-page">

      <div className="downloads-container">

        <div className="downloads-header">

          <h2 className="downloads-title">
            Downloads Center
          </h2>

        </div>

        <div className="downloads-table-wrapper">

          <table className="downloads-table">

            <thead>

              <tr>
                <th>ID</th>
                <th>File Name</th>
                <th>File Type</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {files.length > 0 ? (

                files.map((file) => (

                  <tr key={file.id}>

                    <td>{file.id}</td>

                    <td>{file.fileName}</td>

                    <td>{file.fileType}</td>

                    <td>

                      <button
                        className="download-btn"
                        onClick={() =>
                          handleDownload(file.id)
                        }
                      >
                        ⬇ Download
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="no-files"
                  >
                    No Files Available
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
</>
  );
}

export default DownloadsPage;