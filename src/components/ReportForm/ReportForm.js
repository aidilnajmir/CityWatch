import React, { useState } from "react";
import StyledButton from "../StyledButton";
import "./ReportForm.css";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    severity: "",
    address: "",  // New address field
    latitude: null,
    longitude: null,
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

  const geocodeAddress = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formData.address
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("Address not found");
      }
    } catch (error) {
      console.error("Geocoding Error:", error.message);
      alert("Unable to find the location. Please enter a valid address.");
      return null;
    }
  };

  const handleSubmit = async () => {
    const priorityMap = { Low: 1, Medium: 2, High: 3 }; 
    const userId = localStorage.getItem("user_id"); 

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    const coordinates = await geocodeAddress();
    if (!coordinates) return;

    const formDataToSend = new FormData();
    formDataToSend.append("user_id", userId);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("latitude", coordinates.lat);
    formDataToSend.append("longitude", coordinates.lng);
    formDataToSend.append("priority", priorityMap[formData.severity]);
    formDataToSend.append("phyaddress", formData.address);  // Correct field name

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
          <option value="Infrastructure Issues">Infrastructure Issues"</option>
          <option value="Sanitation & Waste Management">Waste Management</option>
          <option value="Environmental Concerns">Environmental Concerns</option>
          <option value="Public Safety">Public Safety</option>
          <option value="Utility Services">Utility Services</option>
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
          placeholder="Enter physical address"
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
