import React from "react";
import "./Modal.css";

const Modal = ({ showModal, report, onClose }) => {
  if (!showModal) return null;

  // Map priority to severity
  const severityMap = { 1: "Low", 2: "Medium", 3: "High" };
  const severity = severityMap[report.priority] || "Unknown";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{report.title}</h2>
        <p><strong>Category:</strong> {report.category || "Unknown"}</p> {/* Display category */}
        <p><strong>Location:</strong> {report.location || "Unknown"}</p>
        <p><strong>Description:</strong> {report.description || "No description provided"}</p>
        <p><strong>Severity:</strong> {severity}</p>
        <p><strong>Status:</strong> {report.status || "No status available"}</p>
        <img
          src={`http://localhost${report.imageurl}`}
          alt={report.title || "Report Image"}
          className="report-image"
          onError={(e) => {
            e.target.src = "/assets/image-placeholder.jpg";
            console.error(`Failed to load image: http://localhost${report.imageurl}`);
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
