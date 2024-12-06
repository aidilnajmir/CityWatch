import React, { useState } from "react";
import StyledButton from "../StyledButton";
import "./ReportForm.css";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    severity: "",
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

  const handleSubmit = async () => {
    const priorityMap = { Low: 1, Medium: 2, High: 3 }; // Map severity to priority
    const formDataToSend = new FormData();
    formDataToSend.append("user_id", 1); // Replace with actual logged-in user ID
    formDataToSend.append("category", formData.category); // Send category name instead of ID
    formDataToSend.append("description", formData.description);
    formDataToSend.append("longitude", 34.0522); // Replace with actual longitude
    formDataToSend.append("latitude", -118.2437); // Replace with actual latitude
    formDataToSend.append("priority", priorityMap[formData.severity]);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch(
        "http://localhost/Citywatch/CityWatch-Backend/CreateReport.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      console.log("Response from backend:", result);

      if (result.success) {
        alert("Report submitted successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An unexpected error occurred.");
    }
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
