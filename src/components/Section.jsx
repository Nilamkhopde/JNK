import { useState, useEffect } from "react";
import axios from "axios";
import "./Section.css";

export default function Section() {
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/sections");
      setSections(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddSection = async () => {
    if (!sectionName) return alert("Enter section name");

    await axios.post("http://localhost:8080/api/sections", {
      sectionName,
    });

    setSectionName("");
    fetchSections();
  };

  const handleDeleteSection = async (id) => {
    if (!window.confirm("Delete section?")) return;

    await axios.delete(`http://localhost:8080/api/sections/${id}`);
    fetchSections();
  };

  const handleUpdateSection = async () => {
    await axios.put(
      `http://localhost:8080/api/sections/${selectedSection.id}`,
      selectedSection
    );

    setSelectedSection(null);
    fetchSections();
  };

  return (
    <div>

      <h2>Section Management</h2>

      {/* ADD */}
      <div className="section-form">
        <input
          type="text"
          placeholder="Enter Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
        <button onClick={handleAddSection}>Add Section</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Section Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sections.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>
                {selectedSection?.id === s.id ? (
                  <input
                    value={selectedSection.sectionName}
                    onChange={(e) =>
                      setSelectedSection({
                        ...selectedSection,
                        sectionName: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.sectionName
                )}
              </td>

              <td>
                {selectedSection?.id === s.id ? (
                  <button onClick={handleUpdateSection}>Save</button>
                ) : (
                  <button onClick={() => setSelectedSection(s)}>
                    ✏️ Edit
                  </button>
                )}

                <button onClick={() => handleDeleteSection(s.id)}>
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}