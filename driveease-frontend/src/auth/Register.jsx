

// import React, { useState } from "react";
// import axios from "axios";

// export default function Register() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(null);
//     console.log("Registering with:", form);

//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/auth/register",
//         JSON.stringify(form),
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setMessage({ type: "success", text: res.data?.username || "Registered successfully" });
//     } catch (err) {
//       const status = err.response?.status;
//       const data = err.response?.data;
//       console.error("Register error:", status, data);

//       setMessage({
//         type: "error",
//         text: data?.error || data?.message || "Registration failed",
//       });
//     }
//   };

//   return (
//     <div style={{ maxWidth: 420 }}>
//       <h2>Create Account</h2>
//       {message && (
//         <div style={{ color: message.type === "error" ? "crimson" : "green" }}>
//           {message.text}
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function Register() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      username: fd.get("username"),
      email: fd.get("email"),
      password: fd.get("password"),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        data
      );
      setMessage("Registration successful!");
      console.log("Registered user:", res.data);
      // you can redirect to login page after successful registration
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Please try again.");
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Create Account
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField
          name="username"
          label="Username"
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          required
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>

      {message && (
        <Typography
          sx={{ mt: 2 }}
          color={message.includes("failed") ? "error" : "primary"}
        >
          {message}
        </Typography>
      )}
    </Paper>
  );
}
