import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope, FaLock } from "react-icons/fa";

export default function AdminRegister({ switchView }) {

  const [formData, setFormData] = useState({
    name: "", phone: "", address: "", email: "", password: ""
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return toast.error("Upload image ❌");

    try {
      const data = new FormData();
      Object.keys(formData).forEach(k => data.append(k, formData[k]));
      data.append("image", file);

      await axios.post("http://localhost:8080/api/admin/register", data);

      toast.success("Registered ✅");
      switchView("login");

    } catch (err) {
      toast.error("Failed ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <h3>Create Account ✨</h3>

      <div className="input-group"><FaUser /><input name="name" placeholder="Name" onChange={handleChange} /></div>
      <div className="input-group"><FaPhone /><input name="phone" placeholder="Phone" onChange={handleChange} /></div>
      <div className="input-group"><FaMapMarkerAlt /><input name="address" placeholder="Address" onChange={handleChange} /></div>
      <div className="input-group"><FaEnvelope /><input name="email" placeholder="Email" onChange={handleChange} /></div>
      <div className="input-group"><FaLock /><input type="password" name="password" placeholder="Password" onChange={handleChange} /></div>

      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />

      <button type="submit">Register</button>

      <p className="link" onClick={() => switchView("login")}>
        Already have account?
      </p>

    </form>
  );
}