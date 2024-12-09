import React from "react";
import "./ReportCard.css";

const ReportCard = ({ report }) => {
  const imageUrl = report.imageurl
    ? `http://localhost${report.imageurl}` // Use image from the backend
    : "./assets/noimage.png"; // Default fallback image if no image URL is provided

  const severityMap = { 1: "Low", 2: "Medium", 3: "High" };
  const severity = severityMap[report.priority] || "Unknown";

  return (
    <div className="report-card">
      <div className="report-header">
        <p><strong>User:</strong> {report.username || "N/A"}</p>
        <p><strong>Location:</strong> {report.phyaddress || "N/A"}</p>
        <p><strong>Category:</strong> {report.category || "N/A"}</p>
      </div>
      <img
        src={imageUrl}
        alt={report.title || "Report Image"}
        className="report-image"
        onError={(e) => {
          e.target.src = "./assets/noimage.png"; // Default image if the load fails
        }}
      />
      <div className="report-details">
        <h3>{report.title}</h3>
        <p>{report.description || "No description available"}</p>
        <p><strong>Severity:</strong> {severity}</p>
        <p><strong>Status:</strong> {report.status || "No status available"}</p>
      </div>
    </div>
  );
};

export default ReportCard;
