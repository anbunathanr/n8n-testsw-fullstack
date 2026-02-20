import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function NCRList() {
  const [ncrs, setNcrs] = useState([]);

  useEffect(() => {
    fetchNCRs();
  }, []);

  const fetchNCRs = async () => {
    const res = await API.get("/ncr");
    setNcrs(res.data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>NCR List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>NCR No</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {ncrs.map((ncr) => (
            <tr key={ncr.ncr_id}>
              <td>  <Link to={`/ncr/${ncr.ncr_id}`}>
    {ncr.ncr_number}
  </Link></td>
              <td>{ncr.severity_level}</td>
              <td>{ncr.status}</td>
              <td>{ncr.cost_impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
