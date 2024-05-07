// Admin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Admin.css';
import { API_URLS } from '../api';

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URLS.ADMIN_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        setIsAdminLoggedIn(true);
        navigate('/admin_dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className='login-body'>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-items'>
          <div className='form-item1'>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-item2'>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
