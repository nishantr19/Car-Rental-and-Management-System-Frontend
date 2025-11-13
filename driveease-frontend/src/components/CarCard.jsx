// // CarCard.jsx
// import React, { useState } from "react";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import TextField from "@mui/material/TextField";
// import Alert from "@mui/material/Alert";
// import CircularProgress from "@mui/material/CircularProgress";

// export default function CarCard({ car }) {
//   const image = car.image || "/placeholder.jpg";

//   const [open, setOpen] = useState(false);
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleOpen = () => {
//     setErrorMsg("");
//     setSuccessMsg("");
//     setStart("");
//     setEnd("");
//     setOpen(true);
//   };
//   const handleClose = () => {
//     if (!loading) setOpen(false);
//   };

//   // Utility: normalize datetime-local value to 'YYYY-MM-DDTHH:mm:ss'
//   const normalizeLocalDateTime = (val) => {
//     if (!val) return "";
//     // datetime-local gives "YYYY-MM-DDTHH:mm" (no seconds) in many browsers
//     // Ensure we have seconds; do not append timezone (no 'Z')
//     return val.length === 16 ? `${val}:00` : val;
//   };

//   const handleBook = async () => {
//     setErrorMsg("");
//     setSuccessMsg("");

//     if (!start || !end) {
//       setErrorMsg("Please enter both start and end datetimes.");
//       return;
//     }

//     // Basic client validation: start < end
//     const s = new Date(start);
//     const e = new Date(end);
//     if (isNaN(s) || isNaN(e) || s >= e) {
//       setErrorMsg("Start must be before end and valid datetimes.");
//       return;
//     }

//     // IMPORTANT: send local datetime strings (no timezone/Z)
//     const payload = {
//       carId: String(car.id),
//       // backend expects parseable LocalDateTime (e.g. "2025-11-01T09:00:00")
//       start: normalizeLocalDateTime(start),
//       end: normalizeLocalDateTime(end),
//     };

//     const token = localStorage.getItem("token"); // adjust key if needed
//     if (!token) {
//       setErrorMsg("You must be logged in to book. Please login and try again.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const apiBase = import.meta.env.VITE_API_BASE_URL || "";
//       const resp = await fetch(`${apiBase}/bookings/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!resp.ok) {
//         const errBody = await resp.json().catch(() => ({}));
//         const message =
//           errBody?.message || errBody?.error || `Booking failed: ${resp.status}`;
//         throw new Error(message);
//       }

//       const data = await resp.json();
//       setSuccessMsg("Booking created successfully.");
//       setTimeout(() => {
//         setLoading(false);
//         setOpen(false);
//       }, 900);
//     } catch (err) {
//       setErrorMsg(err.message || "Booking failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//         <CardMedia
//           component="img"
//           height="160"
//           image={image}
//           alt={`${car.make} ${car.model}`}
//         />
//         <CardContent sx={{ flexGrow: 1 }}>
//           <Typography variant="h6">
//             {car.make} {car.model}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {car.year} • {car.registrationNumber || ""}
//           </Typography>
//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             sx={{ mt: 2 }}
//           >
//             <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//               Rs {car.dailyRate}/day
//             </Typography>
//           </Stack>
//         </CardContent>
//         <CardActions>
//           <Button size="small" variant="contained" onClick={handleOpen}>
//             Book
//           </Button>
//           <Button size="small">Details</Button>
//         </CardActions>
//       </Card>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>
//           Book {car.make} {car.model}
//         </DialogTitle>
//         <DialogContent dividers sx={{ minWidth: 360 }}>
//           {errorMsg && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {errorMsg}
//             </Alert>
//           )}
//           {successMsg && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {successMsg}
//             </Alert>
//           )}

//           <TextField
//             label="Start"
//             type="datetime-local"
//             fullWidth
//             margin="normal"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             label="End"
//             type="datetime-local"
//             fullWidth
//             margin="normal"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />

//           <Typography
//             variant="caption"
//             color="text.secondary"
//             sx={{ display: "block", mt: 1 }}
//           >
//             Times are local. Booking price will be calculated by the server.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} disabled={loading}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleBook}
//             variant="contained"
//             disabled={loading}
//             startIcon={loading ? <CircularProgress size={16} /> : null}
//           >
//             {loading ? "Booking..." : "Confirm Booking"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

import React, { useState, useMemo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function CarCard({ car }) {
  // ✅ Predefined car image URLs
  const carImages = [
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=60",
  
    
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1511125357779-27038c647d9d?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=60",
 
 
  
  ];

  // ✅ pick random image once per component mount
  const randomImage = useMemo(() => {
    const index = Math.floor(Math.random() * carImages.length);
    return carImages[index];
  }, []);

  const image = car.image || randomImage;

  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpen = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setStart("");
    setEnd("");
    setOpen(true);
  };
  const handleClose = () => {
    if (!loading) setOpen(false);
  };

  const normalizeLocalDateTime = (val) => {
    if (!val) return "";
    return val.length === 16 ? `${val}:00` : val;
  };

  const handleBook = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!start || !end) {
      setErrorMsg("Please enter both start and end datetimes.");
      return;
    }

    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s) || isNaN(e) || s >= e) {
      setErrorMsg("Start must be before end and valid datetimes.");
      return;
    }

    const payload = {
      carId: String(car.id),
      start: normalizeLocalDateTime(start),
      end: normalizeLocalDateTime(end),
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("You must be logged in to book. Please login and try again.");
      return;
    }

    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const resp = await fetch(`${apiBase}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errBody = await resp.json().catch(() => ({}));
        const message =
          errBody?.message || errBody?.error || `Booking failed: ${resp.status}`;
        throw new Error(message);
      }

      await resp.json();
      setSuccessMsg("Booking created successfully.");
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 900);
    } catch (err) {
      setErrorMsg(err.message || "Booking failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={`${car.make} ${car.model}`}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            {car.make} {car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {car.year} • {car.registrationNumber || ""}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              ₹{car.dailyRate}/day
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpen}>
            Book
          </Button>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Book {car.make} {car.model}
        </DialogTitle>
        <DialogContent dividers sx={{ minWidth: 360 }}>
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          <TextField
            label="Start"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            Times are local. Booking price will be calculated by the server.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleBook}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
