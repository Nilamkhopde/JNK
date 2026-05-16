import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ switchView }) {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // ✅ handle input change
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      return toast.error("Enter email & password ❌");
    }

    try {
      // ✅ CREATE FORMDATA
      const data = new FormData();
      data.append("email", loginData.email);       // ✅ email added
      data.append("password", loginData.password); // ✅ password added

      console.log("Sending FormData:", loginData); // debug

      const res = await axios.post(
  "http://localhost:8080/api/admin/login",
  data
);

// ✅ SAVE ADMIN DATA


      // ✅ SUCCESS
      toast.success("Login Successful ✅");

      console.log("Response:", res.data);
localStorage.setItem("admin", JSON.stringify(res.data));
      // ✅ redirect
      setTimeout(() => {
        navigate("/dashboard"); 
        // navigate("/dashboard/users");
      }, 1500);

    } catch (err) {
      console.log("Error:", err.response);
      toast.error(err.response?.data || "Login Failed ❌");
    }
  };
  

  return (
    <form onSubmit={handleLogin} className="form">

     <h3 className="welcome-title">Welcome Back 👋</h3>

      <div className="input-group">
        <FaEnvelope />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <FaLock />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
      </div>

      <p className="link" onClick={() => switchView("forgot")}>
        Forgot Password?
      </p>

      <button type="submit">Login</button>

    </form>
  );
}



// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaEnvelope, FaLock } from "react-icons/fa";

// export default function AdminLogin({ switchView }) {

//     const [email, setEmail]=useState("");
//     const [password , setPassword]=useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();


//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/admin/login",
//         FormData.append(email,"email"),
//         FormData.append(password,"password")

//       );
      
//         alert('Admin Login Succesfully');
//         return;

//       toast.success(res.data);
//       window.location.href = "/dashboard/users";

//     } catch (err) {
//       toast.error(err.response?.data || "Login Failed ❌");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="form">

//       <h3>Welcome Back 👋</h3>

//       <div className="input-group">
//         <FaEnvelope />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e)=>setEmail({...form,email:e.target.value})}
//         />
//       </div>

//       <div className="input-group">
//         <FaLock />
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e)=>setPassword({...form,password:e.target.value})}
//         />
//       </div>

//       <p className="link" onClick={() => switchView("forgot")}>
//         Forgot Password?
//       </p>

//       <button type="submit">Login</button>

//     </form>
//   );
// }