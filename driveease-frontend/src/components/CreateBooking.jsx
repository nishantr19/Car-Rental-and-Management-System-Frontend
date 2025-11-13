import React, { useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateBooking() {
  const { id } = useParams(); // car id
  const navigate = useNavigate();
  const [start,setStart] = useState("");
  const [end,setEnd] = useState("");
  const [err,setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings/create", {
        carId: id,
        start, end
      });
      navigate("/cars");
    } catch (e) {
      setErr(e.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div>
      <h2>Book Car #{id}</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <form onSubmit={submit}>
        <div>
          <label>Start (YYYY-MM-DDTHH:MM:SS)</label>
          <input value={start} onChange={e=>setStart(e.target.value)} placeholder="2025-11-01T09:00:00" required/>
        </div>
        <div>
          <label>End</label>
          <input value={end} onChange={e=>setEnd(e.target.value)} placeholder="2025-11-03T09:00:00" required/>
        </div>
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}