import React from 'react';
import { TextField } from '@mui/material';

const TextInputBox = ({ text, onClick, fullWidth }) => {
    return (
      <TextField
        onClick={onClick}
        variant="outlined"
        fullWidth={fullWidth}
        placeholder={text}
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#6941C6',
              borderRadius: '8px',
            },
            '&:hover fieldset': {
              borderColor: '#532f9b',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#532f9b',
            },
          },
          '& .MuiInputBase-input': {
            color: '#333', 
            padding: '10px 12px',
          },
        }}
      />
    );
  };
  
  export default TextInputBox;