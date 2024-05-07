import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import '../css/Admin.css'
import { API_URLS } from '../api';

const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024; // Convert MB to bytes

const CreateUserModal = ({ closeModal, fromCreateUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    homeAddress: '',
    phoneNumber: '',
    dob: new Date(),
    gender: '',
    nationality: '',
    occupation: '',
    image: null,
  });

  const [imageError, setImageError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
  
    if (type === 'file') {
      // Check image size before updating state
      if (files[0] && files[0].size > MAX_IMAGE_SIZE_BYTES) {
        setImageError(`Image size exceeds ${MAX_IMAGE_SIZE_MB}MB`);
      } else {
        setImageError('');
        setFormData(prevState => ({
          ...prevState,
          [name]: files[0]
        }));
      }
    } else {
      // For text inputs and other types
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      // Clear email error when email is changed
      if (name === 'email') {
        setEmailError('');
      }
    }
  };
  

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      dob: date
    }));
  };

  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are filled
      for (const key in formData) {
        if (key !== 'image' && formData[key] === '') {
          alert(`Please fill in the ${key} field`);
          return;
        }
      }
      
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axios.post(API_URLS.ADMIN_CREATE_NEW_USER, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('User created successfully:', response.data);
      const userId = response.data.userId;
      navigate('/Created_User_Details', { state: { userId, plainPassword: response.data.plainPassword } });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response && error.response.status === 400 && error.response.data.error === 'Email already exists') {
        setEmailError('Email already exists');
      } else {
        setEmailError('');
      }
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className='modal-container'>
      <div className="modal">
        <div className='close-modal-div'><FontAwesomeIcon icon={faWindowClose} className='close-modal-icon' onClick={handleCloseModal} /></div>
        <form onSubmit={handleSubmit}>
          {/* Input fields for user details */}
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          {emailError && <p className="error-message">{emailError}</p>}
          <input type="text" name="homeAddress" placeholder="Home Address" value={formData.homeAddress} onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <div className='date-picker-container'>
          <label className='dob-label'>DOB:</label>         
             <DatePicker
             className='picker'
              selected={formData.dob}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholder="Date of Birth (dd/mm/yyyy)"
             />
         </div>
          <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
          <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} required />
          <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} required />
          <label htmlFor="image">Upload Image:</label>      
          <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" />
          {imageError && <p className="error-message">{imageError}</p>}
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;