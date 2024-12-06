import React from "react";
import "./ReportCard.css";

const ReportCard = ({ report }) => {
  // Log the report object for debugging
  console.log("Report Data:", report);

  // Construct the full URL for the image
  const imageUrl = `http://localhost${report.imageurl}`; // Ensure imageurl is correct in the API response

  // Map priority (integer) to severity (string)
  const severityMap = { 1: "Low", 2: "Medium", 3: "High" };
  const severity = severityMap[report.priority] || "Unknown"; // Default to "Unknown" if priority is invalid

  return (
    <div className="report-card">
      <div className="report-header">
        <p><strong>User:</strong> {report.username}</p>
        <p><strong>Location:</strong> {report.location}</p>
        <p><strong>Category:</strong> {report.category}</p>
      </div>
      <img
        src={imageUrl}
        alt={report.title || "Report Image"}
        className="report-image"
        onError={(e) => {
          e.target.src = "/assets/image-placeholder.jpg"; // Show a placeholder if the image fails to load
          console.error(`Failed to load image: ${imageUrl}`);
        }}
      />
      <div className="report-details">
        <h3>{report.title}</h3>
        <p>{report.description}</p>
        <p><strong>Severity:</strong> {severity}</p> {/* Map and display severity */}
        <p><strong>Status:</strong> {report.status}</p>
      </div>
    </div>
  );
};

export default ReportCard;
