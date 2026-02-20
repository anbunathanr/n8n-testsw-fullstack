import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FMEAForm() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    failure_mode: "",
    severity: "",
    occurrence: "",
    detection: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const rpn =
    formData.severity &&
    formData.occurrence &&
    formData.detection
      ? formData.severity * formData.occurrence * formData.detection
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/fmea", {
      ncr_id: id,
      ...formData
    });

    navigate(`/ncr/${id}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>FMEA Analysis</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", maxWidth: "500px" }}>

        <textarea
          name="failure_mode"
          placeholder="Failure Mode"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="severity"
          placeholder="Severity (1-10)"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="occurrence"
          placeholder="Occurrence (1-10)"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="detection"
          placeholder="Detection (1-10)"
          onChange={handleChange}
          required
        />

        <p><b>RPN:</b> {rpn}</p>

        <button type="submit">Save FMEA</button>

      </form>
    </div>
  );
}
