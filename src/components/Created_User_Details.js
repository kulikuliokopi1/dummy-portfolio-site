import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import '../css/User_Details.css';
import { API_URLS } from '../api';

const Created_User_Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state.userId;
  const plainPassword = location.state.plainPassword;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URLS.GET_USER_DETAILS_BY_ID(userId));
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const copyToClipboard = (username, password) => {
    if (username && password) {
      const textToCopy = `Username: ${username}, Password: ${password}`;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert('Username and password copied to clipboard:', textToCopy);
        })
        .catch((error) => {
          console.error('Error copying username and password to clipboard:', error);
        });
    }
  };

  const handleCloseUserDetails = () => {
    navigate('/admin_dashboard');
  };

  return (
    <div className='user-details-container'>
      <div className='details-content'>
      <div className='close-user-details-div'><FontAwesomeIcon icon={faWindowClose} className='close-user-details-icon' onClick={handleCloseUserDetails} /></div>
      <h2>User Details</h2>
      {userData ? (
        <div>
          <p><strong>User ID:</strong> {userData.user_id}</p>
          <div className='image-container'>
          {userData.image && <img src={userData.image} alt="User" />}
          </div>
          <p>
            Copy username and Password before leaving this page.
            <button onClick={() => copyToClipboard(userData.username, plainPassword)}>Copy</button>
          </p>
          <p><strong>Username:</strong> {userData.username}</p>
          {plainPassword && (
            <>
              <p>
                <strong>Password:</strong> {plainPassword}
              </p>
            </>
          )}
          <p><strong>First Name:</strong> {userData.first_name}</p>
          <p><strong>Last Name:</strong> {userData.last_name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Home Address:</strong> {userData.home_address}</p>
          <p><strong>Phone Number:</strong> {userData.phone_number}</p>
          <p><strong>Date of Birth:</strong> {userData.dob}</p>
          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>Nationality:</strong> {userData.nationality}</p>
          <p><strong>Occupation:</strong> {userData.occupation}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
    </div>
  );
};

export default Created_User_Details;
