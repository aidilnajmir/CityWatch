import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Typography } from '@mui/material';
import StyledButton from '../components/StyledButton';
import EditPasswordPopup from '../components/EditPasswordPopup';
import './styles/SettingsPage.css';

const SettingsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editField, setEditField] = useState(null);
  const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);

  const handleOpenPasswordPopup = () => {
    setPasswordPopupOpen(true);
  };

  const handleClosePasswordPopup = () => {
    setPasswordPopupOpen(false);
  };

  const handleEditField = (field) => {
    setEditField(field);
  };

  const handleSave = () => {
    alert(`${editField} updated successfully!`);
    setEditField(null);
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
              onClick={editField === 'name' ? handleSave : () => handleEditField('name')}
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
              onClick={editField === 'email' ? handleSave : () => handleEditField('email')}
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
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
                <MenuItem value="AR">Arkansas</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="CO">Colorado</MenuItem>
                <MenuItem value="CT">Connecticut</MenuItem>
                <MenuItem value="DE">Delaware</MenuItem>
                <MenuItem value="FL">Florida</MenuItem>
                <MenuItem value="GA">Georgia</MenuItem>
                <MenuItem value="HI">Hawaii</MenuItem>
                <MenuItem value="ID">Idaho</MenuItem>
                <MenuItem value="IL">Illinois</MenuItem>
                <MenuItem value="IN">Indiana</MenuItem>
                <MenuItem value="IA">Iowa</MenuItem>
                <MenuItem value="KS">Kansas</MenuItem>
                <MenuItem value="KY">Kentucky</MenuItem>
                <MenuItem value="LA">Louisiana</MenuItem>
                <MenuItem value="ME">Maine</MenuItem>
                <MenuItem value="MD">Maryland</MenuItem>
                <MenuItem value="MA">Massachusetts</MenuItem>
                <MenuItem value="MI">Michigan</MenuItem>
                <MenuItem value="MN">Minnesota</MenuItem>
                <MenuItem value="MS">Mississippi</MenuItem>
                <MenuItem value="MO">Missouri</MenuItem>
                <MenuItem value="MT">Montana</MenuItem>
                <MenuItem value="NE">Nebraska</MenuItem>
                <MenuItem value="NV">Nevada</MenuItem>
                <MenuItem value="NH">New Hampshire</MenuItem>
                <MenuItem value="NJ">New Jersey</MenuItem>
                <MenuItem value="NM">New Mexico</MenuItem>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="NC">North Carolina</MenuItem>
                <MenuItem value="ND">North Dakota</MenuItem>
                <MenuItem value="OH">Ohio</MenuItem>
                <MenuItem value="OK">Oklahoma</MenuItem>
                <MenuItem value="OR">Oregon</MenuItem>
                <MenuItem value="PA">Pennsylvania</MenuItem>
                <MenuItem value="RI">Rhode Island</MenuItem>
                <MenuItem value="SC">South Carolina</MenuItem>
                <MenuItem value="SD">South Dakota</MenuItem>
                <MenuItem value="TN">Tennessee</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
                <MenuItem value="UT">Utah</MenuItem>
                <MenuItem value="VT">Vermont</MenuItem>
                <MenuItem value="VA">Virginia</MenuItem>
                <MenuItem value="WA">Washington</MenuItem>
                <MenuItem value="WV">West Virginia</MenuItem>
                <MenuItem value="WI">Wisconsin</MenuItem>
                <MenuItem value="WY">Wyoming</MenuItem>
              </Select>
            ) : (
              <Typography className="field-text">{state || 'Not set'}</Typography>
            )}
            <StyledButton
              text={editField === 'state' ? 'Save' : 'Edit'}
              onClick={editField === 'state' ? handleSave : () => handleEditField('state')}
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
              onClick={editField === 'zipcode' ? handleSave : () => handleEditField('zipcode')}
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
              onClick={editField === 'phoneNumber' ? handleSave : () => handleEditField('phoneNumber')}
              className="edit-button"
            />
          </Box>
        </Box>

        <Box className="change-password-container">
          <StyledButton
            text="Change Password"
            onClick={handleOpenPasswordPopup}
            className="change-password-button"
          />
        </Box>
        <EditPasswordPopup
          open={passwordPopupOpen}
          onClose={handleClosePasswordPopup}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
