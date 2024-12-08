// src/components/CreateReportModal.js
import React from 'react';
import ReportForm from '../ReportForm/ReportForm';
import './CreateReportModal.css';

const CreateReportModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h1>Create a New Report</h1>
        <ReportForm />
      </div>
    </div>
  );
};

export default CreateReportModal;
