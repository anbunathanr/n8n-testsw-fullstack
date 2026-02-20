import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StatusBadge from "../../components/StatusBadge";

export default function NCRDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [ncr, setNcr] = useState(null);

  useEffect(() => {
    fetchNCR();
  }, [id]);

  const fetchNCR = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/ncr/${id}`
      );
      setNcr(res.data);
    } catch (err) {
      console.error("Error fetching NCR:", err);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/ncr/${id}`,
        { status: newStatus }
      );
      fetchNCR();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (!ncr) return <div>Loading...</div>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>NCR Details</h2>

      <p><b>NCR Number:</b> {ncr.ncr_number}</p>
      <p><b>Description:</b> {ncr.ncr_description}</p>
      <p><b>Severity:</b> {ncr.severity_level}</p>
      <p><b>Cost:</b> {ncr.cost_impact}</p>

      <p>
        <b>Status:</b> <StatusBadge status={ncr.status} />
      </p>

      <br />

      {ncr.status === "Open" && (
        <button onClick={() => updateStatus("RCA")}>
          Start RCA
        </button>
      )}

      {ncr.status === "RCA" && (
        <button onClick={() => navigate(`/ncr/${id}/rca`)}>
          Submit RCA
        </button>
      )}

      {ncr.status === "QC_Review" && (
        <>
          <button onClick={() => updateStatus("Corrective_Action")}>
            Approve
          </button>

          <button onClick={() => updateStatus("RCA")}>
            Reject
          </button>
        </>
      )}

      {ncr.status === "Corrective_Action" && (
        <>
          <button onClick={() => navigate(`/ncr/${id}/capa`)}>
            Create CAPA
          </button>

          <button onClick={() => navigate(`/ncr/${id}/fmea`)}>
            Perform FMEA
          </button>

          <button onClick={() => navigate(`/ncr/${id}/verification`)}>
            Verify Effectiveness
          </button>

          <button onClick={() => updateStatus("Closed")}>
            Close NCR
          </button>
        </>
      )}
    </div>
  );
}
