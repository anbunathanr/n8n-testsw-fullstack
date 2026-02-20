import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{
      backgroundColor: "#1e293b",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      <h2 style={{ margin: 0 }}>QMS System</h2>

      <div>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/create" style={linkStyle}>Create NCR</Link>
        <Link to="/ncrs" style={linkStyle}>NCR List</Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginLeft: "20px",
  fontWeight: "bold"
};
