import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./AdminKeyPage.css";

const AdminKeyPage = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!key.trim()) return;

    try {
      setLoading(true);
      setError("");

      await api.post("/verify-admin", { adminKey: key.trim() });

      localStorage.setItem("adminKey", key.trim());
      navigate("/admin/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid admin key. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-key-page">
      <div className="admin-key-box">
        <h2>Admin Access</h2>
        <p>Enter your admin key to continue</p>

        <input
          type="password"
          placeholder="Admin Key"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {error && <p className="admin-key-error">{error}</p>}

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Verifying..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default AdminKeyPage;
