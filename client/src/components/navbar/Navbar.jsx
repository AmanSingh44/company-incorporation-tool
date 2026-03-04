import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/admin/login")}>Admin</button>
    </nav>
  );
}
