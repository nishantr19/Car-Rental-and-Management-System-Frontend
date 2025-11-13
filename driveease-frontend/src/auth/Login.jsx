// import React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";

// export default function Login() {
//   function handleSubmit(e) {
//     e.preventDefault();
//     const fd = new FormData(e.target);
//     console.log("Login submit:", { email: fd.get("email"), password: fd.get("password") });
//     // call your API/auth logic here
//   }

//   return (
//     <Paper sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
//       <Typography variant="h5" gutterBottom>Login</Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
//         <TextField name="email" label="Email" type="email" required />
//         <TextField name="password" label="Password" type="password" required />
//         <Button type="submit" variant="contained">Login</Button>
//       </Box>
//     </Paper>
//   );
// }

import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function Login() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      username: fd.get("email"), // backend expects username
      password: fd.get("password"),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        data
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      setMessage("Login successful!");
      console.log("JWT Token:", token);
      // redirect to dashboard or cars page
    } catch (err) {
      console.error(err);
      setMessage("Invalid credentials or server error");
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField name="email" label="Username" required />
        <TextField name="password" label="Password" type="password" required />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
      {message && (
        <Typography sx={{ mt: 2 }} color="primary">
          {message}
        </Typography>
      )}
    </Paper>
  );
}
