import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./FormSec.css";

function FormSec() {

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    city: "",
    address: ""
  });

  const [file, setFile] = useState(null);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  /* ================= FILE CHANGE ================= */
  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION
    if (!formData.fullName || !formData.mobileNumber) {
      toast.error("Name & Mobile Number are required ❌");
      return;
    }

    if (!file) {
      toast.error("Please upload image ❌");
      return;
    }

    try {

      const data = new FormData();

      // APPEND FORM DATA
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // APPEND IMAGE
      data.append("image", file);

      // API CALL
      await axios.post(
        "http://localhost:8080/api/users/addUser",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      // SUCCESS TOAST
      toast.success("User Added Successfully ✅");

      // RESET FORM
      setFormData({
        fullName: "",
        mobileNumber: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        city: "",
        address: ""
      });

      setFile(null);

      // RESET FILE INPUT
      document.getElementById("fileInput").value = "";

    } catch (error) {

      console.error(error);

      toast.error("Error while submitting ❌");

    }

  };

  return (
    <>

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      {/* TITLE */}
      

      {/* MAIN CONTAINER */}
      <div className="container">

      
        {/* ================= FORM SECTION ================= */}
        <div className="form-box">
{/* 
            <div className="form-title">
        <h2>Registration Form</h2>
      </div> */}

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
            />

            {/* FILE INPUT */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />

            {/* SUBMIT BUTTON */}
            <button type="submit">
              Submit Registration
            </button>

          </form>

        </div>

        {/* ================= VIDEO SECTION ================= */}
        <div className="video-box">

          <iframe
            src="https://www.youtube.com/embed/eLYlxyc7qmM"
            title="Registration Video"
            allowFullScreen
          ></iframe>

          {/* INFO */}
          <div className="info">

            <h4>How to Register?</h4>

            <p>1. Fill all required details carefully.</p>

            <p>2. Upload your profile image.</p>

            <p>3. Click on submit registration button.</p>

            <p>4. Name & Mobile Number are mandatory.</p>

            {/* MARATHI */}
            <h4 style={{ marginTop: "18px" }}>
              नोंदणी कशी करावी?
            </h4>

            <p>1. सर्व माहिती व्यवस्थित भरा.</p>

            <p>2. तुमचा फोटो अपलोड करा.</p>

            <p>3. सबमिट बटणावर क्लिक करा.</p>

            <p>4. नाव व मोबाईल नंबर आवश्यक आहे.</p>

          </div>

        </div>

      </div>

    </>
  );
}

export default FormSec;











// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./FormSec.css";

// function FormSec() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobileNumber: "",
//     email: "",
//     dateOfBirth: "",
//     gender: "",
//     city: "",
//     address: ""
//   });

//   const [file, setFile] = useState(null);

//   // INPUT CHANGE
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // FILE CHANGE
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = new FormData();

//       Object.keys(formData).forEach((key) => {
//         data.append(key, formData[key]);
//       });

//       data.append("image", file);

//       await axios.post(
//         "http://localhost:8080/api/users/addUser",
//         data
//       );

//       toast.success("User Added Successfully ✅");

//       setFormData({
//         fullName: "",
//         mobileNumber: "",
//         email: "",
//         dateOfBirth: "",
//         gender: "",
//         city: "",
//         address: ""
//       });

//       setFile(null);

//     } catch (err) {
//       console.error(err);
//       toast.error("Error while submitting ❌");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
  
//       <div className="form-title">

//         <h2>Registration Form</h2>
//       </div>

//       <div className="container">

//         {/* FORM */}
//         <div className="form-box">
//           <form onSubmit={handleSubmit}>
//             <input name="fullName" placeholder="Name" value={formData.fullName} onChange={handleChange} required />
//             <input name="mobileNumber" placeholder="Mobile" value={formData.mobileNumber} onChange={handleChange} required />
//             <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//             <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

//             <select name="gender" value={formData.gender} onChange={handleChange}>
//               <option value="">Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//             </select>

//             <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
//             <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

//             <input type="file" onChange={handleFileChange} required />

//             <button type="submit">Submit</button>
//           </form>
//         </div>

//         {/* VIDEO SECTION */}
//         <div className="video-box">
//           <iframe
//             src="https://www.youtube.com/embed/eLYlxyc7qmM"
//             title="YouTube video"
//             allowFullScreen
//           ></iframe>

//           <div className="info">
//             <h4>How to Register?</h4>
//             <p>1. Fill the form</p>
//             <p>2. Submit details</p>
//             <p>3. Name & Mobile required</p>

//            {/* comment */ }
//             <h4 style={{ marginTop: "15px" }}>नोंदणी कशी करावी?</h4>
//              <p>1. फॉर्म भरा</p>
//              <p>2. माहिती सबमिट करा</p>
//              <p>3. नाव व मोबाईल आवश्यक आहे</p>
//           </div>
          
//         </div>

//       </div>
//     </>
//   );
// }

// export default FormSec;