import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function FormPage() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phoneNumber && email) {
      const userData = {
        name,
        phoneNumber,
        email,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/second-page');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', marginLeft: '30rem' }}>
      <h1>Enter Your Details</h1>
      <TextField
        style={{ marginBottom: '1rem', width: '100%' }}
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        style={{ marginBottom: '1rem', width: '100%' }}
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        style={{ marginBottom: '1rem', width: '100%' }}
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        style={{ width: '100%' }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </div>
  );
}

export default FormPage;
