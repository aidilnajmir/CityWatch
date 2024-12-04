import React from 'react';

function AdminHeader() {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>CITYWATCH</h1>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#6941C6',
  color: '#fff',
};

const titleStyle = {
  margin: 0,
  fontSize: '1.5rem',
};

export default AdminHeader;
