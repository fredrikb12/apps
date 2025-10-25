import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/apps">Home</Link>
        <Link to="/apps/todos">Todos</Link>
      </div>
      <hr></hr>
    </nav>
  );
}
