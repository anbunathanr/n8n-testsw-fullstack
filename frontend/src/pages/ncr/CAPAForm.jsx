import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CAPAForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    action_plan: "",
    assigned_to: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/capa", {
      ncr_id: id,
      ...formData
    });

    navigate(`/ncr/${id}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Create CAPA</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", maxWidth: "500px" }}>
        <textarea
          name="action_plan"
          placeholder="Action Plan"
          onChange={handleChange}
          required
        />

        <input
          name="assigned_to"
          placeholder="Assigned To (User UUID)"
          onChange={handleChange}
          required
        />

        <button type="submit">Create CAPA</button>
      </form>
    </div>
  );
}
