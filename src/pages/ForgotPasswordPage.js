import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/ForgotPasswordPage.css';


const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handlePasswordChange = () => {
    // Add sign-up logic here
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Box className="forgot-password-page">
      <Box component="img" src={logo} alt="CityWatch Logo" className="forgot-password-logo" />

      <Typography variant="h4" className="citywatch-title">
        CITYWATCH
      </Typography>

      <Typography variant="h5" className="forgot-password-title">
        Change Password
      </Typography>

      <Typography variant="body1" className="subtitle">
        Enter your Credentials
      </Typography>

      <Box className="input-container">
        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Email address</Typography>
          <TextInputBox text="Enter your email" fullWidth />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">New Password</Typography>
          <TextInputBox text="Password" type="password" fullWidth />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Confirm Password</Typography>
          <TextInputBox text="Password" type="password" fullWidth />
        </Box>
      </Box>

      <StyledButton text="Update password" onClick={handlePasswordChange} fullWidth className="update-password-button" />

      <Typography variant="body2" className="signin-link">
        Have an account? <Link href="#" onClick={handleSignIn}>Sign In</Link>
      </Typography>
    </Box>
  );
};


export default ForgotPasswordPage;
