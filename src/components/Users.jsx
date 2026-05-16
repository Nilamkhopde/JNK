import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./user.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/getAllUsers")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  const filtered = users.filter(u =>
    u.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-container">

      {/* TOP BAR */}
      <div className="users-header">
        <h2>Users Management</h2>

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search user..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>City</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u, index) => (
                <tr key={u.userId}>
                  <td>{index + 1}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.city}</td>
                  <td>{u.address}</td>

                  <td className="actions">
                    <button className="btn view">
                      <FaEye />
                    </button>
                    <button className="btn edit">
                      <FaEdit />
                    </button>
                    <button className="btn delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}