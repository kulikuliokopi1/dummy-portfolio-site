import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LogIn.css';
import { API_URLS } from '../api.js';

const UserLogin = ({ setIsUserLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URLS.USER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Login successful!');
        setIsUserLoggedIn(true);
        navigate('/user_dashboard', { state: { user: data.user } });
      } else if (response.status === 401) {
        setMessage('Invalid username or password.');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
  <div className='login-container'>
  <div className='image'>
    <img src='/assets/images/hero-image.png' alt='happy-customers'/>
  </div>
    <div className='user-login-body'>
      <h2>Login Here</h2>
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
    </div>
  );
};

export default UserLogin;
