import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Select, MenuItem, Typography } from '@mui/material';
import StyledButton from '../components/StyledButton';
import EditPasswordPopup from '../components/EditPasswordPopup';
import './styles/SettingsPage.css';


const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", 
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", 
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const SettingsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');const [password, setPassword] = useState(''); 
  const [zipcode, setZipcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editField, setEditField] = useState(null);
  const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);


  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');
        console.log(id);
        const response = await axios.get('http://localhost/Citywatch/CityWatch-Backend/get_user_data.php?user_id=' + id, {
          withCredentials: true,  // Important if you're using cookies/session for authentication
        });

        const userSettings = response.data;

        if (userSettings.success) {
          setName(userSettings.user.name || '');
          setEmail(userSettings.user.email || '');
          setState(userSettings.address.state_name || '');
          setZipcode(userSettings.address.zipcode || '');
          setPhoneNumber(userSettings.user.phone_number || '');  // Assuming phone number is included in user data
        } else {
          console.error('Error fetching user data:', userSettings.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenPasswordPopup = () => {
    setPasswordPopupOpen(true);
  };

  const handleClosePasswordPopup = () => {
    setPasswordPopupOpen(false);
  };

  const handleEditField = (field) => {
    setEditField(field);
  };

  const handleSave = async (field) => {
    try {
      const id = localStorage.getItem('id'); // Assuming user ID is stored in localStorage
      const data = {};
  
      switch (field) {
        case 'name':
          data.name = name;
          break;
        case 'email':
          data.email = email;
          break;
        case 'state':
          data.state = state;
          break;
        case 'zipcode':
          data.zipcode = zipcode;
          break;
        case 'password':
          data.password = password; // New password field
          break;
        default:
          break;
      }
  
      // Construct the URL for the POST request
      const url = 'http://localhost/Citywatch/CityWatch-Backend/update_user_data.php';
  
      // Add user_id to the data object
      data.user_id = id;
  
      // Send POST request with data in the body
      const response = await axios.post(url, data);
  
      if (response.data.success) {
        alert(`${field} updated successfully!`);
        setEditField(null); // Reset field edit state
      } else {
        alert(`Failed to update ${field}`);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('There was an error updating your information.');
    }
  };
  return (
    <div className="settings-page">
      <div className="content">
        <Typography variant="h4" className="settings-title">Account Settings</Typography>
        <Box className="form">
          {/* Editable Name */}
          <Box className="form-group">
            <Typography className="field-label">Name</Typography>
            {editField === 'name' ? (
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="form-field"
                size="small"
              />
            ) : (
              <Typography className="field-text">{name || 'Not set'}</Typography>
            )}
            <StyledButton
              text={editField === 'name' ? 'Save' : 'Edit'}
              onClick={editField === 'name' ? () => handleSave('name') : () => handleEditField('name')}
              className="edit-button"
            />
          </Box>

          {/* Editable Email */}
          <Box className="form-group">
            <Typography className="field-label">Email Address</Typography>
            {editField === 'email' ? (
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-field"
                size="small"
              />
            ) : (
              <Typography className="field-text">{email || 'Not set'}</Typography>
            )}
            <StyledButton
              text={editField === 'email' ? 'Save' : 'Edit'}
              onClick={editField === 'email' ? () => handleSave('email') : () => handleEditField('email')}
              className="edit-button"
            />
          </Box>

          {/* Editable State */}
          <Box className="form-group">
      <Typography className="field-label">State</Typography>
      {editField === 'state' ? (
        <Select
          value={state}
          onChange={(e) => setState(e.target.value)}
          displayEmpty
          className="form-field"
          size="small"
        >
          <MenuItem value="" disabled>Select your state</MenuItem>
          {/* Map through the states and create MenuItem for each */}
          {US_STATES.map((stateName) => (
            <MenuItem key={stateName} value={stateName}>
              {stateName}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Typography className="field-text">{state || 'Not set'}</Typography>
      )}
      <StyledButton
        text={editField === 'state' ? 'Save' : 'Edit'}
        onClick={editField === 'state' ? () => handleSave('state') : () => handleEditField('state')}
        className="edit-button"
      />
    </Box>

          {/* Editable Zip Code */}
          <Box className="form-group">
            <Typography className="field-label">Zip Code</Typography>
            {editField === 'zipcode' ? (
              <TextField
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Enter your zip code"
                className="form-field"
                size="small"
              />
            ) : (
              <Typography className="field-text">{zipcode || 'Not set'}</Typography>
            )}
            <StyledButton
              text={editField === 'zipcode' ? 'Save' : 'Edit'}
              onClick={editField === 'zipcode' ? () => handleSave('zipcode') : () => handleEditField('zipcode')}
              className="edit-button"
            />
          </Box>

          {/* Editable Phone Number */}
          <Box className="form-group">
            <Typography className="field-label">Phone Number</Typography>
            {editField === 'phoneNumber' ? (
              <TextField
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="form-field"
                size="small"
              />
            ) : (
              <Typography className="field-text">{phoneNumber || 'Not set'}</Typography>
            )}
            <StyledButton
              text={editField === 'phoneNumber' ? 'Save' : 'Edit'}
              onClick={editField === 'phoneNumber' ? () => handleSave('phoneNumber') : () => handleEditField('phoneNumber')}
              className="edit-button"
            />
          </Box>



          <Box className="form-group">
  <Typography className="field-label">Change Password</Typography>
  {editField === 'password' ? (
    <TextField
      type="password" // Set input type to 'password' to hide the characters
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your new password"
      className="form-field"
      size="small"
    />
  ) : (
    <Typography className="field-text">**********</Typography> // Mask the password value when not editing
  )}
  <StyledButton
    text={editField === 'password' ? 'Save' : 'Edit'}
    onClick={editField === 'password' ? () => handleSave('password') : () => handleEditField('password')}
    className="edit-button"
  />
</Box>
        </Box>



        

       
      </div>
    </div>
  );
};

export default SettingsPage;