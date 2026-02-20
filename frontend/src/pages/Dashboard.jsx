import { useEffect, useState } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [ncrs, setNcrs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/ncr");
    setNcrs(res.data);
  };

  const total = ncrs.length;
  const open = ncrs.filter(n => n.status !== "Closed").length;
  const closed = ncrs.filter(n => n.status === "Closed").length;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <StatCard title="Total NCRs" value={total} />
        <StatCard title="Open NCRs" value={open} />
        <StatCard title="Closed NCRs" value={closed} />
      </div>
    </div>
  );
}
