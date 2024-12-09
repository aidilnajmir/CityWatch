import React, { useState } from 'react';
import { TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EditPasswordPopup = ({ open, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNextStep = () => {
    // Replace this check with actual validation logic
    if (currentPassword === 'correct-password') {
      setStep(2);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect current password. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (newPassword === confirmNewPassword) {
      onClose();
      alert('Password successfully updated!');
    } else {
      setErrorMessage('New passwords do not match.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{step === 1 ? 'Enter Current Password' : 'Enter New Password'}</DialogTitle>
      <DialogContent>
        {step === 1 && (
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}
        {step === 2 && (
          <>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
          </>
        )}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {step === 1 ? (
          <Button onClick={handleNextStep}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditPasswordPopup;
