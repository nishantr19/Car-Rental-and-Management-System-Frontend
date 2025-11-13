import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CarCard from "./CarCard";
import api from "../api"; // keep your existing api wrapper (axios) or replace with fetch

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("/cars/available")
      .then(res => {
        if (!mounted) return;
        setCars(res.data || []);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Welcome back! Please log in to continue. ");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <BoxCentered><CircularProgress /></BoxCentered>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <Typography variant="h5" gutterBottom>Available Cars</Typography>
      <Grid container spacing={3}>
        {cars.map(car => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <CarCard car={car} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function BoxCentered({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 240 }}>
      {children}
    </div>
  );
}