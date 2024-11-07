import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box className="welcome-page">
      <Box component="img" src={logo} alt="CityWatch Logo" className="welcome-logo" />

      <Typography variant="h4" className="citywatch-title">
        CITYWATCH
      </Typography>

      <Typography variant="body1" className="welcome-title">
        Welcome back! Please enter your details.
      </Typography>

      <Box sx={{ width: '100%', marginTop: '16px' }}>
        <Typography variant="body2" className="text-field-label">Email</Typography>
        <TextInputBox text="Enter your email" fullWidth />
      </Box>

      <Box sx={{ width: '100%', marginTop: '8px' }}>
        <Typography variant="body2" className="text-field-label">Password</Typography>
        <TextInputBox text="••••••••" type="password" fullWidth />
      </Box>

      <Box className="checkbox-link-container">
        <FormControlLabel control={<Checkbox />} label="Remember for 30 days" />
        <Link href="#" sx={{ fontSize: '0.875rem' }}>Forgot password</Link>
      </Box>

      <StyledButton text="Sign in" onClick={handleLogin} fullWidth className="signin-button" />

      <Typography variant="body2" className="or-text">or</Typography>

      <StyledButton text="Register" onClick={handleRegister} fullWidth className="register-button" />
    </Box>
  );
};

export default LoginPage;
