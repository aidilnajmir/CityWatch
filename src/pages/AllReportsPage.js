import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar/Navbar";
import ReportCard from "../components/ReportCard/ReportCard";
import Pagination from "../components/Pagination/Pagination";
import Modal from "../components/Modal/Modal";
import axios from "axios";
import "./styles/AllReportsPage.css";

const REPORTS_PER_PAGE = 6;

const AllReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost/Citywatch/CityWatch-Backend/reports.php"
        );
        if (response.data.success) {
          setReports(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to fetch reports");
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

  const openModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  return (
    <div className="all-reports-layout">
      <div className="content-wrapper">
        <div className="reports-page">
          {loading ? (
            <p>Loading reports...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              <div className="reports-container">
                {currentReports.map((report) => (
                  <div key={report.id} onClick={() => openModal(report)}>
                    <ReportCard report={report} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal showModal={showModal} report={selectedReport} onClose={closeModal} />
    </div>
  );
};

export default AllReportsPage;
