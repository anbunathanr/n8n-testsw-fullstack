export default function StatusBadge({ status }) {

  const colors = {
    OPEN: "#ff9800",
    RCA_ASSIGNED: "#2196f3",
    RCA_SUBMITTED: "#9c27b0",
    RCA_APPROVED: "#4caf50",
    CLOSED: "#2e7d32"
  };

  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "20px",
        backgroundColor: colors[status] || "#999",
        color: "white",
        fontWeight: "bold"
      }}
    >
      {status}
    </span>
  );
}
