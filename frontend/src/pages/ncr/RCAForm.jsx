import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RCAForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    root_cause: "",
    corrective_action: "",
    submitted_by: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/rca", {
      ncr_id: id,
      root_cause: formData.root_cause,
      corrective_action: formData.corrective_action,
      submitted_by: formData.submitted_by
    });

    navigate(`/ncr/${id}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Submit RCA</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", maxWidth: "500px" }}>

        <textarea
          name="root_cause"
          placeholder="Root Cause"
          value={formData.root_cause}
          onChange={handleChange}
          required
        />

        <textarea
          name="corrective_action"
          placeholder="Corrective Action"
          value={formData.corrective_action}
          onChange={handleChange}
          required
        />

        <input
          name="submitted_by"
          placeholder="Submitted By (User UUID)"
          value={formData.submitted_by}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit RCA</button>
      </form>
    </div>
  );
}
