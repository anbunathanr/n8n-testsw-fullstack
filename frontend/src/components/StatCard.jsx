export default function StatCard({ title, value }) {
  return (
    <div style={{
      padding: "20px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      minWidth: "150px"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
