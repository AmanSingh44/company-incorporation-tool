import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./AdminDashboardPage.css";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null); // full company detail
  const [overlayLoading, setOverlayLoading] = useState(false);

  useEffect(() => {
    const adminKey = localStorage.getItem("adminKey");
    if (!adminKey) {
      navigate("/admin/login");
      return;
    }

    const fetchCompanies = async () => {
      try {
        const response = await api.get("/company", {
          headers: { "admin-key": adminKey },
        });
        setCompanies(response.data.companies);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
        setError("Failed to load companies. Check your admin key.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleRowClick = async (companyId) => {
    try {
      setOverlayLoading(true);
      setSelected(null);
      const adminKey = localStorage.getItem("adminKey");
      const response = await api.get(`/${companyId}`, {
        headers: { "admin-key": adminKey },
      });
      setSelected(response.data.company);
    } catch (err) {
      console.error("Failed to fetch company details:", err);
    } finally {
      setOverlayLoading(false);
    }
  };

  const closeOverlay = () => setSelected(null);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Companies</h2>
        <button
          className="admin-logout"
          onClick={() => {
            localStorage.removeItem("adminKey");
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>

      {loading && <p className="admin-status">Loading...</p>}
      {error && <p className="admin-status admin-error">{error}</p>}
      {!loading && !error && companies.length === 0 && (
        <p className="admin-status">No companies found.</p>
      )}

      {!loading && !error && companies.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Shareholders</th>
              <th>Total Capital</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id} onClick={() => handleRowClick(c.id)}>
                <td>{c.name}</td>
                <td>{c.shareholderCount}</td>
                <td>{c.totalCapital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Overlay */}
      {(overlayLoading || selected) && (
        <div className="overlay-backdrop" onClick={closeOverlay}>
          <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
            {overlayLoading && <p className="overlay-loading">Loading...</p>}

            {selected && (
              <>
                <div className="overlay-header">
                  <div>
                    <h3>{selected.name}</h3>
                    <span className="overlay-meta">
                      {selected.shareholderCount} shareholders,
                      {selected.totalCapital} capital
                    </span>
                  </div>
                  <button className="overlay-close" onClick={closeOverlay}>
                    ✕
                  </button>
                </div>

                <div className="overlay-shareholders">
                  {selected.shareholders && selected.shareholders.length > 0 ? (
                    selected.shareholders.map((sh, i) => (
                      <div key={i} className="sh-row">
                        <span className="sh-num">{i + 1}</span>
                        <span className="sh-name">
                          {sh.firstName} {sh.lastName}
                        </span>
                        <span className="sh-nationality">{sh.nationality}</span>
                      </div>
                    ))
                  ) : (
                    <p className="overlay-empty">No shareholders added yet.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
