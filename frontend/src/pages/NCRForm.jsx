import { useState } from "react";
import API from "../services/api";

export default function NCRForm() {
  const [formData, setFormData] = useState({
    ncr_number: "",
    issue_id: "",
    ncr_description: "",
    severity_level: "Low",
    business_impact: "",
    cost_impact: "",
    created_by: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/ncr", formData);
      alert("NCR Created Successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating NCR");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Create NCR</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", maxWidth: "500px" }}>

        <input name="ncr_number" placeholder="NCR Number" onChange={handleChange} required />

        <input name="issue_id" placeholder="Issue ID (UUID)" onChange={handleChange} required />

        <textarea name="ncr_description" placeholder="Description" onChange={handleChange} required />

        <select name="severity_level" onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <input name="business_impact" placeholder="Business Impact" onChange={handleChange} required />

        <input name="cost_impact" type="number" placeholder="Cost Impact" onChange={handleChange} required />

        <input name="created_by" placeholder="Created By (User UUID)" onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}