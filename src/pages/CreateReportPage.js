import React from 'react';
import { Modal, Box } from '@mui/material';
import ReportForm from './components/ReportForm/ReportForm';
import './styles/CreateReportPage.css';

const CreateReportPage = ({ showModal, onClose }) => {
  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby="create-report-modal-title"
      aria-describedby="create-report-modal-description"
    >
      <Box className="modal-container">
        <h2 id="create-report-modal-title">Create a New Report</h2>
        <ReportForm />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </Box>
    </Modal>
  );
};

export default CreateReportPage;
