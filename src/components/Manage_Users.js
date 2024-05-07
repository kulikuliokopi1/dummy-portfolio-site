import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CreateUserModal from './Create_User_Modal.js'; // Import the modal component
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../api.js';

const Manage_Users = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  // eslint-disable-next-line
  const [totalSearchUsers, setTotalSearchUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false); 
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false); 
  const [showOptions, setShowOptions] = useState(null); 
  const [userToDelete, setUserToDelete] = useState(null); 
  const navigate = useNavigate();

  const usersPerPage = 15;

  useEffect(() => {
    // Fetch total number of users from the database
    axios.get(API_URLS.TOTAL_USERS)
      .then(response => {
        setTotalUsers(response.data.totalUsers);
      })
      .catch(error => {
        console.error('Error fetching total number of users:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch users from the database
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchInput]);

  // Function to fetch users from the database
  const fetchUsers = () => {
    let url = API_URLS.ADMIN_FETCH_USERS(currentPage, usersPerPage);

    if (searchInput) {
      url += `&search=${searchInput}`;
    }

    axios.get(url)
      .then(response => {
        setUsers(response.data.users);
        setTotalSearchUsers(response.data.totalSearchUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  // Function to handle pagination click
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to handle modal visibility for create user modal
  const toggleCreateUserModal = () => {
    setShowCreateUserModal(!showCreateUserModal);
  };

  // Function to toggle options card visibility
  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleViewDetails = (userId) => {
    navigate('/user_details', { state: { userId, fromManageUsers: true } }); 
};

  // Function to handle delete user click
  const handleDeleteUser = (userId) => {
    setUserToDelete(userId); 
    setShowDeleteUserModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      // Send DELETE request to backend to delete user
      await axios.delete(API_URLS.DELETE_USER(userToDelete));
      
      // Close delete user modal after deletion
      setShowDeleteUserModal(false);
      
      // Fetch total number of users from the database again
      axios.get(API_URLS.TOTAL_USERS)
        .then(response => {
          setTotalUsers(response.data.totalUsers);
        })
        .catch(error => {
          console.error('Error fetching total number of users:', error);
          // Display error message to user
          alert('An error occurred while updating the user list. Please try again later.');
        });
      
      // Fetch users again to update the list
      fetchUsers();
  
      // Clear userToDelete state
      setUserToDelete(null);
  
      // Show success message to the user
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      // Display error message to user
      alert('An error occurred while deleting the user. Please try again later.');
    }
  };
  
  
  
  


  // Function to cancel delete user
  const cancelDeleteUser = () => {
    setShowDeleteUserModal(false); 
  };

  return (
    <div className="manage-users-container">
      <div className='backdrop'></div>
      <div className='manage-users-1'>
        <div className='users-count'>
          <div id='total-users'>{totalUsers}</div>
          <p>Total Users</p>
        </div>
        <div className='btn'>
          {/* Button to open create user modal */}
          <button onClick={toggleCreateUserModal}>Create User</button>
          <div className='search-user'>
            <input type='text' placeholder='Enter user ID' value={searchInput} onChange={handleSearchInputChange}></input>
          </div>
        </div>
      </div>
      <div className='action-div'>
        <div className='all-users-search'>
          <h2>ALL USERS</h2>
        </div>
      </div>
      <div className='all-users'>
        {/* Table structure */}
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Account Balance (AUD)</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {/* Display users */}
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                <td>{user.user_id}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.gender}</td>
                <td>{parseFloat(user.balance).toLocaleString()}</td>
                <td>
                  <div className="dropdown-container">
                  <FontAwesomeIcon
                    icon={showOptions === index ? faAngleUp : faAngleDown}
                    className={`dropdown-icon ${showOptions === index ? 'angle-up' : 'angle-down'}`}
                    onClick={() => toggleOptions(index)}
                  />
                    {/* Options card */}
                    {showOptions === index && (
                      <div className="options-card">
                        <p onClick={() => handleViewDetails(user.user_id)}>View Full User Details</p>
                        <p onClick={() => handleDeleteUser(user.user_id)}>Delete User</p>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination-container'>
        {/* Pagination */}
        {Array.from({ length: Math.ceil(totalUsers / usersPerPage) }, (_, i) => (
          <button key={i} onClick={() => handlePaginationClick(i + 1)}>{i + 1}</button>
        ))}
      </div>

      {/* Render modal and modal overlay if showModal state is true */}
      {showCreateUserModal && (
        <>
          <div className='modal-overlay'></div>
          <CreateUserModal closeModal={toggleCreateUserModal} />
        </>
      )}

      {/* Render delete user confirmation modal */}
      {showDeleteUserModal && (
        <>
        <div className='modal-overlay'></div>
        <div className="delete-user-modal">
          <div className="delete-user-modal-content">
            <h2>Confirmation</h2>
            <p>Are you sure you want to delete user with ID: {userToDelete}?</p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteUser}>Remove</button>
              <button onClick={cancelDeleteUser}>Cancel</button>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default Manage_Users;
