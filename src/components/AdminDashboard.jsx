import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("users");
  const [contents, setContents] = useState([]);
  const [contentForm, setContentForm] = useState({
  contentName: "",
  contentType: "",
  personName: "",
  role: "",
  description: "",
  sectionId: "",
  image: null
});
const [admin, setAdmin] = useState({
  id: "",
  name: "",
  phone: "",
  address: "",
  email: "",
  image: "",
  newImage: null
});

useEffect(() => {
  fetchAdmin();
}, []);

const fetchAdmin = async () => {
  try {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (!storedAdmin) return;

    const id = storedAdmin.adminId || storedAdmin.id;

    const res = await axios.get(
      `http://localhost:8080/api/admin/profile/${id}`
    );

    const data = res.data;

    setAdmin({
      id: data.adminId,
      name: data.name || "",
      phone: data.phone || "",
      address: data.address || "",
      email: data.email || "",
      image: data.image || "",
      newImage: null
    });

  } catch (err) {
    console.error(err);
  }
};
const fetchContents = async () => {
  const res = await axios.get("http://localhost:8080/content");
  setContents(res.data);
};

useEffect(() => {
  fetchContents();
}, []);

useEffect(() => {
  setContentPage(1);
}, [search]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [modalType, setModalType] = useState("");
  const [sectionName, setSectionName] = useState("");

  const [open, setOpen] = useState(true);
  

  useEffect(() => {
    fetchUsers();
    fetchSections();
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [search]);
  const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 5;

  // ================= FETCH =================
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/getAllUsers");
    setUsers(res.data);
  };

  const fetchSections = async () => {
    const res = await axios.get("http://localhost:8080/api/sections");
    setSections(res.data);
  };

  // ================= USER =================
const handleDeleteUser = async (id) => {

  toast(
    ({ closeToast }) => (

      <div className="delete-toast">

        <p>Are you sure you want to delete?</p>

        <div className="toast-buttons">

          <button
            className="toast-delete-btn"
            onClick={async () => {

              try {

                await axios.delete(
                  `http://localhost:8080/api/users/deleteUserId/${id}`
                );

                fetchUsers();

                toast.success("User Deleted Successfully ✅");

              } catch (err) {

                console.error(err);

                toast.error("Delete Failed ❌");
              }

              closeToast();
            }}
          >
            Yes Delete
          </button>

          <button
            className="toast-cancel-btn"
            onClick={closeToast}
          >
            Cancel
          </button>

        </div>

        

      </div>
    ),

    {
      autoClose: false,
      closeOnClick: false,
    }
  );
};

// ===== COPY USERS =====
const copyUsers = () => {
  const text = filteredUsers
    .map(
      (u) =>
        `${u.userId} | ${u.fullName} | ${u.email} | ${u.city}`
    )
    .join("\n");

  navigator.clipboard.writeText(text);

  toast.success("Copied to clipboard ✅");
};

// ===== CSV USERS =====
const exportUsersCSV = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredUsers);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  XLSX.writeFile(workbook, "Users.csv");
};

// ===== EXCEL USERS =====
const exportUsersExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredUsers);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  XLSX.writeFile(workbook, "Users.xlsx");
};

// ===== PDF USERS =====
const exportUsersPDF = () => {
  const doc = new jsPDF();

  doc.text("Users Report", 14, 15);

  autoTable(doc, {
    head: [["ID", "Name", "Email", "City"]],
    body: filteredUsers.map((u) => [
      u.userId,
      u.fullName,
      u.email,
      u.city,
    ]),
  });

  doc.save("Users.pdf");
};

const handleUpdateAdmin = async () => {
  try {
    if (!admin.id) {
      alert("Admin ID missing ❌");
      return;
    }

    const formData = new FormData();

    formData.append("name", admin.name);
    formData.append("phone", admin.phone || "");
    formData.append("address", admin.address || "");
    formData.append("email", admin.email);

    if (admin.newImage) {
      formData.append("image", admin.newImage);
    }

    const res = await axios.put(
      `http://localhost:8080/api/admin/update/${admin.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // ✅ Update UI instantly
 setAdmin({
  id: res.data.adminId,
  name: res.data.name,
  phone: res.data.phone,
  address: res.data.address,
  email: res.data.email,
  image: res.data.image,
  newImage: null
});

    // ✅ Update localStorage
    localStorage.setItem("admin", JSON.stringify(res.data));

    alert("Admin Updated Successfully ✅");

  } catch (err) {
    console.error(err);
    alert("Update Failed ❌");
  }
};
  const handleUpdateUser = async () => {
  try {
    const data = new FormData();

    data.append("fullName", selectedUser.fullName || "");
    data.append("email", selectedUser.email || "");
    data.append("mobileNumber", selectedUser.mobileNumber || "");
    data.append("dateOfBirth", selectedUser.dateOfBirth || "");
    data.append("gender", selectedUser.gender || "");
    data.append("city", selectedUser.city || "");
    data.append("address", selectedUser.address || "");

    if (selectedUser.newImage) {
      data.append("image", selectedUser.newImage);
    }

    await axios.put(
      `http://localhost:8080/api/users/updateUser/${selectedUser.userId}`,
      data
    );

    alert("Updated Successfully ✅");
    setModalType("");
    fetchUsers();

  } catch (err) {
    console.error(err);
    alert("Update failed ❌");
  }
};
 const handleAddSection = async () => {

  try {

    if (!sectionName) {
      toast.error("Enter Section Name");
      return;
    }

    await axios.post(
      "http://localhost:8080/api/sections",
      {
        sectionName,
      }
    );

    toast.success("Section Added Successfully ✅");

    setSectionName("");

    fetchSections();

  } catch (err) {

    console.log(err);

    toast.error("Failed ❌");
  }
};
  const handleDeleteSection = async (id) => {
    if (!window.confirm("Delete section?")) return;
    await axios.delete(`http://localhost:8080/api/sections/${id}`);
    fetchSections();
  };

 const handleUpdateSection = async () => {
  try {

    const formData = new FormData();

    formData.append(
      "sectionName",
      selectedSection.sectionName || ""
    );

    // ✅ IMAGE
    if (selectedSection.newImage) {
      formData.append("image", selectedSection.newImage);
    }

    await axios.put(
      `http://localhost:8080/api/sections/${selectedSection.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Section Updated Successfully ✅");

    setModalType("");

    fetchSections();

  } catch (err) {

    console.log(err);

    toast.error("Update Failed ❌");
  }
};

  // ================= LOGOUT =================
const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {
    toast.success("Logout Successful ✅");

    setTimeout(() => {
      localStorage.clear();
      navigate("/admin");
    }, 1000);

  } else {
    toast.info("Logout Cancelled");
  }
};

  const filteredUsers = users.filter(
    (u) =>
      (u.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase())
  );
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;

const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
const handleAddContent = async () => {
  try {
    const formData = new FormData();

    Object.keys(contentForm).forEach((key) => {
      formData.append(key, contentForm[key]);
    });

    await axios.post("http://localhost:8080/content", formData);

    alert("Content Added ✅");
    fetchContents();

  } catch (err) {
    console.log(err);
    alert("Failed ❌");
  }
};

const handleDeleteContent = async (id) => {
  if (!window.confirm("Delete content?")) return;

  await axios.delete(`http://localhost:8080/content/${id}`);
  fetchContents();
};

const handleUpdateContent = async () => {
  try {
    const formData = new FormData();

    formData.append("contentName", selectedContent.contentName || "");
    formData.append("contentType", selectedContent.contentType || "");

    // ✅ IMPORTANT mapping
    formData.append("personName", selectedContent.contentPersonName || "");
    formData.append("role", selectedContent.contentRole || "");
    formData.append("description", selectedContent.contentDescription || "");

    // ✅ sectionId fix
    formData.append(
      "sectionId",
      selectedContent.sectionId || selectedContent.section?.id
    );

    // ✅ optional image
    if (selectedContent.image) {
      formData.append("image", selectedContent.image);
    }

    await axios.put(
      `http://localhost:8080/content/${selectedContent.contentId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Updated Successfully ✅");
    setModalType("");
    fetchContents();

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Update failed ❌");
  }
};

// ===== COPY CONTENT =====
const copyContent = () => {
  const text = filteredContent
    .map(
      (c) =>
        `${c.contentId} | ${c.contentName} | ${c.contentType}`
    )
    .join("\n");

  navigator.clipboard.writeText(text);

  toast.success("Copied Successfully ✅");
};

// ===== CSV CONTENT =====
const exportContentCSV = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredContent);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Content");

  XLSX.writeFile(workbook, "Content.csv");
};

// ===== EXCEL CONTENT =====
const exportContentExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredContent);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Content");

  XLSX.writeFile(workbook, "Content.xlsx");
};

// ===== PDF CONTENT =====
const exportContentPDF = () => {
  const doc = new jsPDF();

  doc.text("Content Report", 14, 15);

  autoTable(doc, {
    head: [["ID", "Name", "Type", "Person"]],
    body: filteredContent.map((c) => [
      c.contentId,
      c.contentName,
      c.contentType,
      c.contentPersonName,
    ]),
  });

  doc.save("Content.pdf");
};

const highlight = (text) => {
  if (!search) return text;

  const parts = text.split(new RegExp(`(${search})`, "gi"));

  return parts.map((part, i) =>
    part.toLowerCase() === search.toLowerCase()
      ? <mark key={i}>{part}</mark>
      : part
  );
};

const contentPerPage = 5;
const [contentPage, setContentPage] = useState(1);

const filteredContent = contents.filter(c =>
  (c.contentName || "").toLowerCase().includes(search.toLowerCase())
);

const last = contentPage * contentPerPage;
const first = last - contentPerPage;
const currentContent = filteredContent.slice(first, last);
  return (
    <div className="dashboard">

{/* SIDEBAR */}
<div className={open ? "sidebar" : "sidebar collapsed"}>

  {/* TOP */}
  <div className="sidebar-top">

    <div className="admin-profile">
      <img
        src={
          admin?.newImage
            ? URL.createObjectURL(admin.newImage)
            : admin?.image
            ? `http://localhost:8080/api/image/${admin.image}`
            : "https://dummyimage.com/100x100/cccccc/000000&text=A"
        }
        alt="admin"
        className="admin-img"
      />

      {open && (
        <div className="admin-info">
          <p className="admin-name">{admin?.name || "Admin"}</p>
          <span className="admin-role">Administrator</span>
        </div>
      )}
    </div>

    <button
      className="toggle-btn"
      onClick={() => setOpen(!open)}
    >
      ☰
    </button>
  </div>

  {/* MENU */}
  <ul>

    <li
      className={activeMenu === "users" ? "active" : ""}
      onClick={() => setActiveMenu("users")}
    >
      <span>👤</span>
      {open && <span>Users</span>}
    </li>

    <li
      className={activeMenu === "sections" ? "active" : ""}
      onClick={() => setActiveMenu("sections")}
    >
      <span>📂</span>
      {open && <span>Sections</span>}
    </li>

    <li
      className={activeMenu === "content" ? "active" : ""}
      onClick={() => setActiveMenu("content")}
    >
      <span>📝</span>
      {open && <span>Content</span>}
    </li>

    <li
      className={activeMenu === "settings" ? "active" : ""}
      onClick={() => setActiveMenu("settings")}

    >
      <span>⚙️</span>
      {open && <span>Settings</span>}
    </li>

    <li className="logout-menu" onClick={handleLogout}>
      <span>🚪</span>
      {open && <span>Logout</span>}
    </li>

  </ul>
</div>

      {/* MAIN */}
      <div className="main">
        <div className="topbar">
          <h2>Dashboard</h2>
        </div>

        <div className="content">

         {/* USERS */}
{activeMenu === "users" && (
  <>
<input
  className="search-user-input"
  placeholder="Search user..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

    <div className="export-buttons">

  <button onClick={copyUsers}>
    Copy
  </button>

  <button onClick={exportUsersCSV}>
    CSV
  </button>

  <button onClick={exportUsersExcel}>
    Excel
  </button>

  <button onClick={exportUsersPDF}>
    PDF
  </button>

</div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>City</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {currentUsers.map((u) => (
          <tr key={u.userId}>
            <td>{u.userId}</td>

            {/* ✅ IMAGE */}
            <td>
              <img
                src={
                  u.image
                    ? `http://localhost:8080/api/image/${u.image}`
                    : "https://via.placeholder.com/50"
                }
                alt="user"
                className="user-img"
              />
            </td>

            <td>{u.fullName}</td>
            <td>{u.email}</td>
            <td>{u.address || "N/A"}</td>
            <td>{u.city || "N/A"}</td>

            {/* ✅ ACTION BUTTONS */}
            <td className="action-buttons">
            <button
  className="btn view"
  onClick={() => {
    setSelectedUser(u);
    setModalType("view");
  }}
>
  👁️ View
</button>

             <button
  className="btn edit"
  onClick={() => {
    setSelectedUser({ ...u });
    setModalType("edit");
  }}
>
  ✏️ Update
</button>

              <button
                className="btn delete"
                onClick={() => handleDeleteUser(u.userId)}
              >
                🗑 Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
  >
    ⬅ Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      className={currentPage === i + 1 ? "active" : ""}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage((prev) => prev + 1)}
  >
    Next ➡
  </button>

</div>
    {/* VIEW USER MODAL */}
{modalType === "view" && selectedUser && (
  <div className="modal-overlay">

    <div className="view-popup">

      {/* CLOSE */}
      <button
        className="close-popup"
        onClick={() => setModalType("")}
      >
        ×
      </button>

      <h2>User Details</h2>

      {/* IMAGE */}
      <div className="popup-image">

        <img
          src={
            selectedUser.image
              ? `http://localhost:8080/api/image/${selectedUser.image}`
              : "https://via.placeholder.com/100"
          }
          alt="user"
        />

      </div>

      {/* DETAILS */}
      <div className="popup-details">

        <div>
          <span>Name</span>
          <p>{selectedUser.fullName}</p>
        </div>

        <div>
          <span>Email</span>
          <p>{selectedUser.email}</p>
        </div>

        <div>
          <span>Mobile</span>
          <p>{selectedUser.mobileNumber || "N/A"}</p>
        </div>

        <div>
          <span>DOB</span>
          <p>{selectedUser.dateOfBirth || "N/A"}</p>
        </div>

        <div>
          <span>City</span>
          <p>{selectedUser.city || "N/A"}</p>
        </div>

        <div>
          <span>Gender</span>
          <p>{selectedUser.gender || "N/A"}</p>
        </div>

        <div className="full-width">
          <span>Address</span>
          <p>{selectedUser.address || "N/A"}</p>
        </div>

      </div>

    </div>
  </div>
)}



{/* UPDATE USER MODAL */}
{modalType === "edit" && selectedUser && (
  <div className="modal-overlay">

    <div className="update-popup">

      {/* CLOSE BUTTON */}
      <button
        className="close-popup"
        onClick={() => setModalType("")}
      >
        ×
      </button>

      <h2>Update User</h2>

      {/* IMAGE */}
      <div className="popup-image">

        <img
          src={
            selectedUser.newImage
              ? URL.createObjectURL(selectedUser.newImage)
              : selectedUser.image
              ? `http://localhost:8080/api/image/${selectedUser.image}`
              : "https://via.placeholder.com/100"
          }
          alt="user"
        />

      </div>

      {/* FORM */}
      <div className="update-form">

        <input
          type="text"
          placeholder="Full Name"
          value={selectedUser.fullName || ""}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              fullName: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={selectedUser.email || ""}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Mobile"
          value={selectedUser.mobileNumber || ""}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              mobileNumber: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="City"
          value={selectedUser.city || ""}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              city: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Address"
          value={selectedUser.address || ""}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              address: e.target.value,
            })
          }
        />

        <select
          value={selectedUser.gender || ""}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              gender: e.target.value,
            })
          }
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="file"
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              newImage: e.target.files[0],
            })
          }
        />

        {/* BUTTONS */}
        <div className="update-btns">

          <button
            className="save-update-btn"
            onClick={handleUpdateUser}
          >
            Save Changes
          </button>

          <button
            className="cancel-btn"
            onClick={() => setModalType("")}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  </div>
)}
  </>
)}



            
         

          {/* ========================================= */}
{/* SECTIONS */}
{/* ========================================= */}

{activeMenu === "sections" && (

  <div className="section-page">

    {/* TOP HEADER */}
    <div className="section-top">

      <h2>Manage Sections</h2>

      <div className="section-add-box">

        <input
          type="text"
          placeholder="Enter Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />

        <button onClick={handleAddSection}>
          + Add Section
        </button>

      </div>

    </div>

    {/* TABLE */}
    <div className="section-table-wrapper">

      <table className="section-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
           
          </tr>
        </thead>

        <tbody>

          {sections.length > 0 ? (

            sections.map((s) => (

              <tr key={s.id}>

                {/* ID */}
                <td>{s.id}</td>


                {/* NAME */}
                <td>{s.sectionName}</td>

                {/* ACTION */}
                <td>

                  <div className="section-action-btns">

                    <button
                      className="section-edit-btn"
                      onClick={() => {
                        setSelectedSection({ ...s });
                        setModalType("editSection");
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="section-delete-btn"
                      onClick={() => handleDeleteSection(s.id)}
                    >
                      🗑 Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="4">

                <div className="section-empty">
                  No Sections Available
                </div>

              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>

  </div>

)}
            {activeMenu === "content" && (
  <div className="content-layout">

    {/* LEFT FORM */}
    <div className="content-form">
      <h3>Add Content</h3>

      <input placeholder="Name"
        onChange={(e)=>setContentForm({...contentForm,contentName:e.target.value})} />

      <input placeholder="Type"
        onChange={(e)=>setContentForm({...contentForm,contentType:e.target.value})} />

      <input placeholder="Person Name"
        onChange={(e)=>setContentForm({...contentForm,personName:e.target.value})} />

      <input placeholder="Role"
        onChange={(e)=>setContentForm({...contentForm,role:e.target.value})} />

      <textarea placeholder="Description"
        onChange={(e)=>setContentForm({...contentForm,description:e.target.value})} />

      <select onChange={(e)=>setContentForm({...contentForm,sectionId:e.target.value})}>
        <option>Select Section</option>
        {sections.map(s => (
          <option key={s.id} value={s.id}>{s.sectionName}</option>
        ))}
      </select>

      <input type="file"
        onChange={(e)=>setContentForm({...contentForm,image:e.target.files[0]})} />

      <button className="btn add-btn" onClick={handleAddContent}>
        ➕ Add Content
      </button>
    </div>

    {/* RIGHT TABLE */}
    <div className="content-table">
      <div className="table-top">
        <h3>All Content</h3>
       <input
  className="search-content-input"
  placeholder="Search content..."
  onChange={(e) => setSearch(e.target.value)}
/>
        <div className="export-buttons">

  <button onClick={copyContent}>
    Copy
  </button>

  <button onClick={exportContentCSV}>
    CSV
  </button>

  <button onClick={exportContentExcel}>
    Excel
  </button>

  <button onClick={exportContentPDF}>
    PDF
  </button>

</div>
      </div>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Image</th>
      <th>Name</th>
      <th>Type</th>
      <th>Person</th>
      <th>Role</th>
      <th>Description</th>
      <th>Section</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {currentContent.map(c => (
      <tr key={c.contentId}>
        <td>{c.contentId}</td>

        <td>
          <img
            src={`http://localhost:8080/api/image/${c.contentImage}`}
            className="content-img-table"
          />
        </td>

        <td>{highlight(c.contentName)}</td>

        {/* ✅ FIXED FIELDS */}
        <td>{c.contentType}</td>
        <td>{c.contentPersonName}</td>
        <td>{c.contentRole}</td>
        <td>{c.contentDescription}</td>

        {/* ✅ SECTION NAME */}
        <td>{c.section?.sectionName}</td>

        <td className="action-buttons">
          <button
            className="btn edit"
            onClick={() => {
              setSelectedContent({ ...c });
              setModalType("editContent");
            }}
          >
            ✏️
          </button>

          <button
            className="btn delete"
            onClick={() => handleDeleteContent(c.contentId)}
          >
            🗑
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

{/* PAGINATION */}
<div className="pagination">

  <button
    disabled={contentPage === 1}
    onClick={() => setContentPage(contentPage - 1)}
  >
    Prev
  </button>

  {[
    ...Array(
      Math.ceil(filteredContent.length / contentPerPage)
    ),
  ].map((_, index) => (
    <button
      key={index}
      className={
        contentPage === index + 1
          ? "active-page"
          : ""
      }
      onClick={() => setContentPage(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={
      contentPage ===
      Math.ceil(filteredContent.length / contentPerPage)
    }
    onClick={() => setContentPage(contentPage + 1)}
  >
    Next
  </button>

</div>

    </div>

  </div>

  
)}
{activeMenu === "settings" && admin && (
  <div className="admin-settings-page">

    <div className="admin-settings-card">

      <h2 className="admin-settings-title">
        Admin Settings
      </h2>

      {/* PROFILE IMAGE */}
      <div className="admin-profile-section">

        <img
          className="admin-profile-image"
          src={
            admin.newImage
              ? URL.createObjectURL(admin.newImage)
              : admin.image
              ? `http://localhost:8080/api/image/${admin.image}`
              : "https://dummyimage.com/120x120/cccccc/000000&text=Admin"
          }
          alt="admin"
        />

        <label className="admin-upload-button">

          Change Photo

          <input
            type="file"
            hidden
            onChange={(e) =>
              setAdmin({
                ...admin,
                newImage: e.target.files[0]
              })
            }
          />

        </label>

      </div>

      {/* FORM */}
      <div className="admin-settings-form">

        {/* NAME */}
        <div className="admin-input-box">
          <span className="admin-input-icon">👤</span>

          <input
            className="admin-input-field"
            type="text"
            placeholder="Name"
            value={admin.name}
            onChange={(e) =>
              setAdmin({
                ...admin,
                name: e.target.value
              })
            }
          />
        </div>

        {/* PHONE */}
        <div className="admin-input-box">
          <span className="admin-input-icon">📞</span>

          <input
            className="admin-input-field"
            type="text"
            placeholder="Phone"
            value={admin.phone || ""}
            onChange={(e) =>
              setAdmin({
                ...admin,
                phone: e.target.value
              })
            }
          />
        </div>

        {/* ADDRESS */}
        <div className="admin-input-box">
          <span className="admin-input-icon">🏙️</span>

          <input
            className="admin-input-field"
            type="text"
            placeholder="Address"
            value={admin.address || ""}
            onChange={(e) =>
              setAdmin({
                ...admin,
                address: e.target.value
              })
            }
          />
        </div>

        {/* EMAIL */}
        <div className="admin-input-box">
          <span className="admin-input-icon">📧</span>

          <input
            className="admin-input-field"
            type="email"
            placeholder="Email"
            value={admin.email}
            onChange={(e) =>
              setAdmin({
                ...admin,
                email: e.target.value
              })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="admin-input-box">
          <span className="admin-input-icon">🔒</span>

          <input
            className="admin-input-field"
            type="password"
            placeholder="Password"
            value={admin.password}
            onChange={(e) =>
              setAdmin({
                ...admin,
                password: e.target.value
              })
            }
          />
        </div>

      </div>

      {/* SAVE BUTTON */}
      <button
        className="admin-save-button"
        onClick={handleUpdateAdmin}
      >
        Save Changes
      </button>

    </div>

  </div>
)}
        </div>
      

{/* ========================================= */}
{/* EDIT SECTION MODAL */}
{/* ========================================= */}

{modalType === "editSection" && selectedSection && (

  <div className="section-modal-overlay">

    <div className="section-modal">

      {/* HEADER */}
      <div className="section-modal-header">

        <h2>Edit Section</h2>

        <button
          className="section-close-btn"
          onClick={() => setModalType("")}
        >
          ✕
        </button>

      </div>

      {/* BODY */}
      <div className="section-modal-body">

        <div className="section-field">

          <label>Section Name</label>

          <input
            type="text"
            value={selectedSection.sectionName || ""}
            onChange={(e) =>
              setSelectedSection({
                ...selectedSection,
                sectionName: e.target.value,
              })
            }
          />

        </div>

      </div>

      {/* BUTTONS */}
      <div className="section-modal-buttons">

        <button
          className="section-update-btn"
          onClick={handleUpdateSection}
        >
          Update Section
        </button>

        <button
          className="section-cancel-btn"
          onClick={() => setModalType("")}
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
{modalType === "editContent" && selectedContent && (
  <div className="edit-content-overlay">

    <div className="edit-content-modal">

      {/* HEADER */}
      <div className="edit-content-header">

        <h2>Edit Content</h2>

        <button
          className="edit-close-btn"
          onClick={() => setModalType("")}
        >
          ✕
        </button>

      </div>

      {/* IMAGE */}
      <div className="edit-content-image">

        <img
          src={`http://localhost:8080/api/image/${selectedContent.contentImage}`}
          alt="content"
        />

      </div>

      {/* FORM */}
      <div className="edit-content-form">

        <div className="edit-input-group">
          <label>Content Name</label>

          <input
            type="text"
            value={selectedContent.contentName || ""}
            onChange={(e) =>
              setSelectedContent({
                ...selectedContent,
                contentName: e.target.value,
              })
            }
          />
        </div>

        <div className="edit-input-group">
          <label>Content Type</label>

          <input
            type="text"
            value={selectedContent.contentType || ""}
            onChange={(e) =>
              setSelectedContent({
                ...selectedContent,
                contentType: e.target.value,
              })
            }
          />
        </div>

        <div className="edit-input-group">
          <label>Person Name</label>

          <input
            type="text"
            value={selectedContent.contentPersonName || ""}
            onChange={(e) =>
              setSelectedContent({
                ...selectedContent,
                contentPersonName: e.target.value,
              })
            }
          />
        </div>

        <div className="edit-input-group">
          <label>Role</label>

          <input
            type="text"
            value={selectedContent.contentRole || ""}
            onChange={(e) =>
              setSelectedContent({
                ...selectedContent,
                contentRole: e.target.value,
              })
            }
          />
        </div>

        <div className="edit-input-group full-width">
          <label>Description</label>

          <textarea
            value={selectedContent.contentDescription || ""}
            onChange={(e) =>
              setSelectedContent({
                ...selectedContent,
                contentDescription: e.target.value,
              })
            }
          />
        </div>

        <div className="edit-input-group">
          <label>Section</label>

          <select
            value={selectedContent.section?.id || ""}
            onChange={(e) =>
              setSelectedContent({
                ...selectedContent,
                sectionId: e.target.value,
              })
            }
          >
            <option value="">Select Section</option>

            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.sectionName}
              </option>
            ))}
          </select>
        </div>

        <div className="edit-input-group">
          <label>Update Image</label>

          <input
            type="file"
            onChange={(e) =>
              setSelectedContent({
                ...selectedContent,
                image: e.target.files[0],
              })
            }
          />
        </div>

      </div>

      {/* FOOTER */}
      <div className="edit-content-footer">

        <button
          className="save-content-btn"
          onClick={handleUpdateContent}
        >
          Update Content
        </button>

        <button
          className="cancel-content-btn"
          onClick={() => setModalType("")}
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}
      </div>




      {/* TOAST CONTAINER */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      
    </div>
  );
}

