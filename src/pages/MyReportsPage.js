import React, { useState, useEffect } from "react";

import ReportCard from "../components/ReportCard/ReportCard";
import Pagination from "../components/Pagination/Pagination";
import Modal from "../components/Modal/Modal";
import "./styles/MyReportsPage.css";

const REPORTS_PER_PAGE = 6;

const MyReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userId = localStorage.getItem("user_id"); // Retrieve user_id from localStorage

        if (!userId) {
          setError("User ID not found. Please log in again.");
          return;
        }

        const response = await fetch(
          `http://localhost/Citywatch/CityWatch-Backend/myreports.php?user_id=${userId}`
        );

        const data = await response.json();
        if (data.success) {
          setReports(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const totalPages = Math.ceil(reports.length / REPORTS_PER_PAGE);
  const currentReports = reports.slice(
    (currentPage - 1) * REPORTS_PER_PAGE,
    currentPage * REPORTS_PER_PAGE
  );

  const openModal = (report) => setShowModal(true) || setSelectedReport(report);
  const closeModal = () => setShowModal(false) || setSelectedReport(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-reports-layout">
      <div className="content-wrapper">
        <div className="reports-page">
          <div className="header-container">
            <h1>My Reports</h1>
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          </div>
          
          <div className="reports-container">
            {currentReports.map((report) => (
              <div key={report.id} onClick={() => openModal(report)}>
                <ReportCard report={report} />
              </div>
            ))}
          </div>
          
        </div>
      </div>
      {showModal && <Modal report={selectedReport} onClose={closeModal} />}
    </div>
  );
};

export default MyReportsPage;
