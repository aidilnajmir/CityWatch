import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportForm from '../components/ReportForm/ReportForm';
import './styles/CreateReportPage.css';

const CreateReportPage = () => {
  return (
    <div className="create-report-page">
      <Header />
      <div className="form-container">
        <h1>Create a New Report</h1>
        <ReportForm />
      </div>
      <Footer />
    </div>
  );
};

export default CreateReportPage;