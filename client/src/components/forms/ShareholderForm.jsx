import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./ShareholderForm.css";

export default function ShareholderForm() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const DRAFT_KEY = `shareholderDraft_${companyId}`;

  const [shareholderCount, setShareholderCount] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [shareholders, setShareholders] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch shareholder count
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/${companyId}`);
        setShareholderCount(response.data.company.shareholderCount);
      } catch (error) {
        console.error("Failed to fetch company:", error);
        const message =
          error.response?.data?.message || "Failed to load company details";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [companyId]);

  // Load draft
  useEffect(() => {
    if (shareholderCount === null) return;
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      const { savedShareholders, savedIndex, savedFormData } =
        JSON.parse(saved);
      setShareholders(savedShareholders || []);
      setCurrentIndex(savedIndex || 1);
      setFormData(
        savedFormData || {
          firstName: "",
          lastName: "",
          nationality: "",
        },
      );
    }
  }, [shareholderCount]);

  // Save draft
  useEffect(() => {
    if (shareholderCount === null) return;
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        savedShareholders: shareholders,
        savedIndex: currentIndex,
        savedFormData: formData,
      }),
    );
  }, [shareholders, currentIndex, formData, shareholderCount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(""); // clear error when typing
  };

  const handleNext = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const updated = [...shareholders];
    updated[currentIndex - 1] = formData;
    setShareholders(updated);

    const nextIndex = currentIndex + 1;

    setFormData(
      updated[nextIndex - 1] || {
        firstName: "",
        lastName: "",
        nationality: "",
      },
    );

    setCurrentIndex(nextIndex);
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber >= currentIndex) return;

    const updated = [...shareholders];
    updated[currentIndex - 1] = formData;
    setShareholders(updated);

    setFormData(
      updated[stepNumber - 1] || {
        firstName: "",
        lastName: "",
        nationality: "",
      },
    );

    setCurrentIndex(stepNumber);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setErrorMsg("");

      const finalShareholders = [...shareholders];
      finalShareholders[currentIndex - 1] = formData;

      await api.post(`/${companyId}/shareholders`, finalShareholders);

      localStorage.removeItem(DRAFT_KEY);
      navigate("/");
    } catch (error) {
      console.error("Failed to add shareholders:", error);

      const message =
        error.response?.data?.message || "Failed to submit shareholders";

      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  };

  const isLastShareholder = currentIndex === shareholderCount;

  if (loading) {
    return (
      <div className="form-section">
        <p>Loading...</p>
        {errorMsg && <div className="form-error">{errorMsg}</div>}
      </div>
    );
  }

  return (
    <div className="form-section">
      <h2>Shareholder {currentIndex}</h2>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="nationality"
        placeholder="Nationality"
        value={formData.nationality}
        onChange={handleChange}
      />

      {shareholderCount > 1 && (
        <div className="sh-steps">
          {Array.from({ length: shareholderCount }).map((_, i) => {
            const step = i + 1;
            const isSaved = step < currentIndex;
            const isActive = step === currentIndex;

            return (
              <button
                key={step}
                type="button"
                className={`sh-step-pill ${isActive ? "active" : ""} ${isSaved ? "saved" : ""}`}
                onClick={() => handleStepClick(step)}
                disabled={step > currentIndex}
              >
                {step}
              </button>
            );
          })}
        </div>
      )}

      {isLastShareholder ? (
        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Add Shareholder Details"}
        </button>
      ) : (
        <button onClick={handleNext}>Next</button>
      )}

      {errorMsg && <div className="form-error">{errorMsg}</div>}
    </div>
  );
}
