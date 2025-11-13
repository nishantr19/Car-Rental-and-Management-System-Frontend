// // import React from "react";
// // import { Routes, Route, Link } from "react-router-dom";
// // import AppBar from "@mui/material/AppBar";
// // import Toolbar from "@mui/material/Toolbar";
// // import Typography from "@mui/material/Typography";
// // import Container from "@mui/material/Container";
// // import Button from "@mui/material/Button";
// // import Box from "@mui/material/Box";
// // import Cars from "./components/Cars";
// // import Login from "./auth/Login";       // keep your existing Login/Register or convert later
// // import Register from "./auth/Register"; // optional

// // export default function App() {
// //   return (
// //     <>
// //       <AppBar position="sticky" color="primary">
// //         <Toolbar>
// //           <Typography variant="h6" component={Link} to="/" sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}>
// //             DriveEase
// //           </Typography>

// //           <Box sx={{ display: "flex", gap: 1 }}>
// //             <Button component={Link} to="/cars" color="inherit">Cars</Button>
// //             <Button component={Link} to="/login" color="inherit">Login</Button>
// //             <Button component={Link} to="/register" color="inherit">Register</Button>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>

// //       <Container maxWidth="lg" sx={{ py: 4 }}>
// //         <Routes>
// //           <Route path="/" element={<Typography variant="h4">Welcome to DriveEase</Typography>} />
// //           <Route path="/cars" element={<Cars />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //         </Routes>
// //       </Container>
// //     </>
// //   );
// // }

// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Cars from "./components/Cars";
// import Login from "./auth/Login";
// import Register from "./auth/Register";

// export default function App() {
//   return (
//     <>
//       {/* ====== NAVBAR ====== */}
//       <AppBar
//         position="sticky"
//         color="transparent"
//         elevation={0}
//         sx={{
//           backdropFilter: "blur(8px)",
//           borderBottom: "1px solid rgba(255,255,255,0.1)",
//         }}
//       >
//         <Toolbar>
//           <Typography
//             variant="h5"
//             component={Link}
//             to="/"
//             sx={{
//               color: "primary.main",
//               textDecoration: "none",
//               fontWeight: "bold",
//               flexGrow: 1,
//             }}
//           >
//             DriveEase
//           </Typography>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button component={Link} to="/cars" color="primary" variant="text">
//               Cars
//             </Button>
//             <Button component={Link} to="/login" color="primary" variant="outlined">
//               Login
//             </Button>
//             <Button component={Link} to="/register" color="primary" variant="contained">
//               Register
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* ====== ROUTES ====== */}
//       <Routes>
//         <Route path="/" element={<HeroSection />} />
//         <Route
//           path="/cars"
//           element={
//             <PageContainer>
//               <Cars />
//             </PageContainer>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <PageContainer>
//               <Login />
//             </PageContainer>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <PageContainer>
//               <Register />
//             </PageContainer>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// /* ====== HERO SECTION ====== */
// function HeroSection() {
//   return (
//     <Box
//       sx={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "85vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "white",
//         textAlign: "center",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           backgroundColor: "rgba(0,0,0,0.5)",
//         }}
//       />

//       {/* Content */}
//       <Container
//         maxWidth="md"
//         sx={{
//           position: "relative",
//           zIndex: 2,
//           py: 8,
//         }}
//       >
//         <Typography variant="h3" fontWeight="bold" gutterBottom>
//           Rent Smarter. Drive Easier.
//         </Typography>
//         <Typography variant="h6" sx={{ mb: 4 }}>
//           Explore a wide range of premium and affordable cars at the best rates.
//         </Typography>

//         <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
//           <Button
//             component={Link}
//             to="/cars"
//             variant="contained"
//             size="large"
//             sx={{ px: 4 }}
//           >
//             Browse Cars
//           </Button>
//           <Button
//             component={Link}
//             to="/register"
//             variant="outlined"
//             size="large"
//             sx={{ px: 4, color: "white", borderColor: "white" }}
//           >
//             Get Started
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// /* ====== REUSABLE PAGE CONTAINER ====== */
// function PageContainer({ children }) {
//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         py: 6,
//         px: { xs: 2, sm: 4, md: 6 },
//         minHeight: "80vh",
//       }}
//     >
//       {children}
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Cars from "./components/Cars";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
  // Simple auth state: true when a token exists in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // name used by your login flow
    setIsAuthenticated(!!token);
  }, []);

  // Optional: listen for storage changes (other tabs)
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "token") setIsAuthenticated(!!e.newValue);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Simple logout helper
  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  return (
    <>
      {/* ====== NAVBAR ====== */}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: "bold",
              flexGrow: 1,
            }}
          >
            DriveEase
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/cars" color="primary" variant="text">
              Cars
            </Button>

            {/* Hide or disable login/register when authenticated */}
            {!isAuthenticated ? (
              <>
                <Button component={Link} to="/login" color="primary" variant="outlined">
                  Login
                </Button>
                <Button component={Link} to="/register" color="primary" variant="contained">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button disabled color="primary" variant="outlined">
                  Logged In
                </Button>
                <Button onClick={handleLogout} color="secondary" variant="contained">
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ====== ROUTES ====== */}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route
          path="/cars"
          element={
            <PageContainer>
              <Cars />
            </PageContainer>
          }
        />

        {/* Redirect if already logged in */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <PageContainer>
                <Login onLogin={() => setIsAuthenticated(true)} />
              </PageContainer>
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <PageContainer>
                <Register onRegister={() => setIsAuthenticated(true)} />
              </PageContainer>
            )
          }
        />
      </Routes>
    </>
  );
}

/* ====== HERO SECTION ====== */
function HeroSection() {
  return (
    <Box
      sx={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" }} />
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2, py: 8 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Rent Smarter. Drive Easier.
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Explore a wide range of premium and affordable cars at the best rates.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button component={Link} to="/cars" variant="contained" size="large" sx={{ px: 4 }}>
            Browse Cars
          </Button>
          <Button component={Link} to="/register" variant="outlined" size="large" sx={{ px: 4, color: "white", borderColor: "white" }}>
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

/* ====== REUSABLE PAGE CONTAINER ====== */
function PageContainer({ children }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        px: { xs: 2, sm: 4, md: 6 },
        minHeight: "80vh",
      }}
    >
      {children}
    </Container>
  );
}