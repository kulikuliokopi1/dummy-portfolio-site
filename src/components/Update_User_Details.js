import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import '../css/User_Details.css';
import { API_URLS } from '../api';

const User_Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state.userId;
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URLS.GET_USER_DETAILS_BY_ID(userId));
        setUserData(response.data);
        setEditedUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCloseEditUserDetails = () => {
    navigate(-1);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      for (const key in editedUserData) {
        if (key === 'dob') {
          const isoDate = editedUserData[key];
          const [year, month, day] = isoDate.split('-');
          const formattedDate = `${day}/${month}/${year}`;
          formData.append(key, formattedDate);
        } else {
          formData.append(key, editedUserData[key]);
        }
      }
      if (imageFile) {
        formData.append('image', imageFile);
      }
      console.log('FormData:', formData);
      await axios.put(API_URLS.UPDATE_USER_DETAILS(userId), formData);

      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  

  return (
    <div className='user-details-container'>
  <div className='details-content'>
    <div className='close-user-details-div'><FontAwesomeIcon icon={faWindowClose} className='close-user-details-icon' onClick={handleCloseEditUserDetails} /></div>
    <h2>User Details</h2>
    {userData ? (
      <div className='update-user-container' >
        <p className='user-id'><strong>User ID:</strong> {userData.user_id}</p>
        <div className='image-container'>
          <img src={editedUserData.image} alt="User" />
        </div>
        <input className='upload-img' type="file" name="image" onChange={handleImageChange} />
        <div className='split-in-col'>
          <span>
        <label>
          First Name:
          <input type="text" placeholder="Enter First Name" name="first_name" value={editedUserData.first_name || ''} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" placeholder="Enter Last Name" name="last_name" value={editedUserData.last_name || ''} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Enter Email" name="email" value={editedUserData.email || ''} onChange={handleChange} />
        </label>
        <label>
          Home Address:
          <input type="text" placeholder="Enter Home Address" name="home_address" value={editedUserData.home_address || ''} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" placeholder="Enter Phone Number" name="phone_number" value={editedUserData.phone_number || ''} onChange={handleChange} />
        </label>
        </span>
        <span>
        <label>
          Date of Birth:
          <input type="date" placeholder="Enter DOB" name="dob" value={editedUserData.dob || ''} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <input type="text" placeholder="Enter Gender" name="gender" value={editedUserData.gender || ''} onChange={handleChange} />
        </label>
        <label>
          Nationality:
          <input type="text" placeholder="Enter Nationality" name="nationality" value={editedUserData.nationality || ''} onChange={handleChange} />
        </label>
        <label>
          Occupation:
          <input type="text" placeholder="Enter Occupation" name="occupation" value={editedUserData.occupation || ''} onChange={handleChange} />
        </label>
        </span>
        </div>
      </div>
    ) : (
      <p>Loading user details...</p>
    )}
    <div>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  </div>
</div>

  );
};

export default User_Details;