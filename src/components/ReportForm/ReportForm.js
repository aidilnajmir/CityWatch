import React, { useState } from 'react';
import StyledButton from '../StyledButton';
import './ReportForm.css';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    address: '',
    severity: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <form className="report-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select a category</option>
          <option value="Road Issue">Road Issue</option>
          <option value="Lighting">Lighting</option>
          <option value="Garbage">Garbage</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter report title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="severity">Severity</label>
        <select
          id="severity"
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageUpload}
          className="form-input"
        />
      </div>

      <StyledButton
        text="Submit Report"
        onClick={handleSubmit}
        fullWidth
        className="submit-button"
      />
    </form>
  );
};

export default ReportForm;
