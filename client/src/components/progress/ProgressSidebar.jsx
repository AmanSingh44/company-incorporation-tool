import React from "react";
import "./ProgressSidebar.css";

export default function ProgressSidebar({ currentStep }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Company Tool</h2>

      <div className="step">
        <div className={`circle ${currentStep >= 1 ? "active-circle" : ""}`}>
          1
        </div>
        <span>Add Company</span>
      </div>

      <div className="line"></div>

      <div className="step">
        <div className={`circle ${currentStep >= 2 ? "active-circle" : ""}`}>
          2
        </div>
        <span>Add Shareholders</span>
      </div>
    </div>
  );
}
