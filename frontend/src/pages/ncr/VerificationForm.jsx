import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerificationForm() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    verification_summary: "",
    verified_by: "",
    verification_result: "Pass"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/verification", {
      ncr_id: id,
      ...formData
    });

    navigate(`/ncr/${id}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Effectiveness Verification</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", maxWidth: "500px" }}>

        <textarea
          name="verification_summary"
          placeholder="Verification Summary"
          onChange={handleChange}
          required
        />

        <input
          name="verified_by"
          placeholder="Verified By (User UUID)"
          onChange={handleChange}
          required
        />

        <select name="verification_result" onChange={handleChange}>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>

        <button type="submit">Submit Verification</button>

      </form>
    </div>
  );
}
