import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./CompanyForm.css";

export default function CompanyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    shareholderCount: "",
    totalCapital: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("companyDraft");
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, []);

  // Save draft on change
  useEffect(() => {
    localStorage.setItem("companyDraft", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear error when user edits
    setErrorMsg("");
  };

  const handleSubmit = async () => {
    try {
      setErrorMsg(""); // clear previous errors

      const formDataToSend = {
        ...formData,
        shareholderCount: parseInt(formData.shareholderCount, 10),
        totalCapital: parseFloat(formData.totalCapital),
      };

      const response = await api.post("/company", formDataToSend);

      const companyId = response.data.company.id;

      // clear draft after success
      localStorage.removeItem("companyDraft");

      navigate(`/shareholders/${companyId}`);
    } catch (error) {
      console.error("Error creating company:", error);

      const message =
        error.response?.data?.message || "Failed to create company";

      setErrorMsg(message);
    }
  };

  return (
    <div className="form-section">
      <h2>Add Company</h2>

      <input
        type="text"
        name="name"
        placeholder="Company Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="shareholderCount"
        placeholder="Shareholder Count"
        value={formData.shareholderCount}
        onChange={handleChange}
      />

      <input
        type="number"
        name="totalCapital"
        placeholder="Total Capital"
        value={formData.totalCapital}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Next</button>

      {/* Error message shown below button */}
      {errorMsg && <div className="form-error">{errorMsg}</div>}
    </div>
  );
}
