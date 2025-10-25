import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/todos">Todos</Link>
      </div>
      <hr></hr>
    </nav>
  );
}
