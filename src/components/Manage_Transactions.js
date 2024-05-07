import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NewTransactionModal from './New_Transaction_Modal.js';
import { API_URLS } from '../api.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

  const Manage_Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [gatewayStatus, setGatewayStatus] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [showGatewayAlert, setShowGatewayAlert] = useState(false);
  const [gatewayAlert, setGatewayAlert] = useState('');
  const [showDeleteTxnModal, setShowDeleteTxnModal] = useState(false); 
  const [txnToDelete, setTxnToDelete] = useState(null); 

  useEffect(() => {
    // Fetch gateway status on mount
    fetchGatewayStatus();
  }, []);

  const fetchGatewayStatus = () => {
    axios.get(API_URLS.GATEWAY_STATUS)
      .then(response => {
        const status = response.data.status;
        setGatewayStatus(status);
        setButtonText(status === 'open' ? 'Close' : 'Open');
      })
      .catch(error => {
        console.error('Error fetching gateway status:', error);
      });
  };

  const toggleGateway = () => {
    if (gatewayStatus === 'open') {
      promptGatewayAlert(); // Prompt for alert if gateway is closing
    } else if (gatewayStatus === 'closed') {
      // Update the gateway status directly if opening
      axios.post(API_URLS.UPDATE_GATEWAY, { status: 'open' })
        .then(response => {
          setButtonText('Close'); // Change button text
          setGatewayStatus('open'); // Update gateway status in state
          setGatewayAlert('');
        })
        .catch(error => {
          console.error('Error updating gateway status:', error);
        });
    }
  };
  
  const promptGatewayAlert = () => {
    setShowGatewayAlert(true);
  };

  const confirmAlert = (alertMessage) => {
    axios.post(API_URLS.UPDATE_ALERT, { alert: alertMessage })
      .then(response => {
        // If the alert update is successful, update the gateway status
        axios.post(API_URLS.UPDATE_GATEWAY, { status: 'closed' })
          .then(response => {
            setButtonText('Open');
            setGatewayStatus('closed');
          })
          .catch(error => {
            console.error('Error updating gateway status:', error);
          });
      })
      .catch(error => {
        console.error('Error updating gateway alert:', error);
      });
    setShowGatewayAlert(false);
  };

  const fetchTransactions = (url) => {
    axios.get(url)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };

  useEffect(() => {
    // Fetch recent transactions when component mounts
    const recentTransactionsUrl = API_URLS.RECENT_TRANSACTIONS;
    fetchTransactions(recentTransactionsUrl);
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  useEffect(() => {
    // Fetch transactions based on selected period or custom dates 
    const url = getUrlForSelectedPeriod();
    if (url) {
      fetchTransactions(url);
    }
  }, [selectedPeriod, startDate, endDate]);

  const getUrlForSelectedPeriod = () => {
    switch (selectedPeriod) {
      case 'lifetime':
        return API_URLS.FILTER_TRANSACTIONS_LIFETIME;
      case '24hrs':
        return API_URLS.FILTER_TRANSACTIONS_24HRS;
      case '3days':
        return API_URLS.FILTER_TRANSACTIONS_3DAYS;
      case '7days':
        return API_URLS.FILTER_TRANSACTIONS_7DAYS;
      case '1month':
        return API_URLS.FILTER_TRANSACTIONS_30DAYS;
      case '3months':
        return API_URLS.FILTER_TRANSACTIONS_90DAYS;
      case 'custom':
        if (startDate && endDate) {
          return API_URLS.FILTER_TRANSACTIONS_CUSTOM(startDate, endDate);
        }
        break;
      default:
        return null;
    }
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const toggleTxnModal = () => {
    setShowModal(true);
  };

  const cancelShowGatewayAlert = () => {
    setShowGatewayAlert(false);
  };
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Fetch transactions based on entered user ID or email
      const searchUrl = API_URLS.SEARCH_USER_BY_ID_OR_EMAIL(searchInput);
      fetchTransactions(searchUrl);
    }
  };

  const handleTransactionSuccess = () => {
    // Fetch transactions again to update the UI
    const recentTransactionsUrl = API_URLS.RECENT_TRANSACTIONS;
    fetchTransactions(recentTransactionsUrl);
  };

   // Function to handle delete transaction click
   const handleDeleteTxn = (transactionId) => {
    setTxnToDelete(transactionId); 
    setShowDeleteTxnModal(true);
  };

  const confirmDeleteTxn = async () => {
    try {
      // Send DELETE request to backend to delete transaction
      await axios.delete(API_URLS.DELETE_TXN(txnToDelete));
      
      // Close delete user modal after deletion
      setShowDeleteTxnModal(false);
      
      // Clear userToDelete state
      setTxnToDelete(null);
  
      // Show success message to the user
      alert('Transaction deleted successfully!');
      // fetch transactions to update UI
      const recentTransactionsUrl = API_URLS.RECENT_TRANSACTIONS;
      fetchTransactions(recentTransactionsUrl);
    } catch (error) {
      console.error('Error deleting user:', error);
      // Display error message to user
      alert('An error occurred while deleting the transaction. Please try again later.');
    }
  };


   // Function to cancel delete transaction
   const cancelDeleteTxn = () => {
    setShowDeleteTxnModal(false); 
  };

  return (
    <div className="manage-transactions-container">
        {/* Modal Overlay */}
      {showModal && <div className='modal-overlay'></div>}

      {/* Transaction Backdrop */}
      <div className='txn-backdrop'></div>

      {/* New Transaction Section */}
      <div className='manage-transaction-1'>
      <div className='new-transaction'>
        <h2>Deposit/Withdraw</h2>
        <button onClick={toggleTxnModal}>New</button>
      </div>

      {/* Gateway */}
      <div className='gateway'>
        <div className='gateway-content'>
          <h2>User Transaction Gateway</h2>
          <button className='gateway-toggle' onClick={toggleGateway}>{buttonText}</button>
        </div>

        {/* Gateway Alert */}
        {showGatewayAlert && (
          <>
          <div className='modal-overlay'></div>
          <div className="gateway-alert">
            <h3>Enter Alert here:</h3>
            <div className='pop-up'>
              <input 
                type='text' 
                placeholder='Enter gateway alert message' 
                value={gatewayAlert}
                onChange={(e) => setGatewayAlert(e.target.value)}
              />
            </div>
            <span>
            <button onClick={() => confirmAlert(gatewayAlert)}>Confirm</button>
            <button onClick={cancelShowGatewayAlert}>Cancel</button>
            </span>
          </div>
      </>
        )}
      </div>
      </div>

      {/* Recent Transactions Section */}
      <div className='txn-action-div'>
        <div className='transaction-search'>
          <input 
            placeholder='Search transaction by user id or email'
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <div className='filter-by-period'>
          <p>Filter by period:</p>
          <select value={selectedPeriod} onChange={handlePeriodChange}>
            <option value="">Select Period</option>
            <option value="lifetime">Lifetime</option>
            <option value="24hrs">24 hrs</option>
            <option value="3days">3 days</option>
            <option value="7days">7 days</option>
            <option value="1month">30 Days</option>
            <option value="3months">90 Days</option>
            <option value="custom">Custom period</option>
          </select>
          {selectedPeriod === 'custom' && (
            <div className='custom-date-picker'>
              <DatePicker selected={startDate} onChange={handleStartDateChange} placeholderText='start-date' />
              <DatePicker selected={endDate} onChange={handleEndDateChange} placeholderText='end-date' />
            </div>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className='transactions'>
        <div className='all-transactions'>
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>User ID</th>
                <th>Transaction Type</th>
                <th>Narration</th>
                <th>Amount (AUD)</th>
                <th>Date</th>
                <th>Time</th>
                <th>Delete TXN</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{index + 1}</td>
                    <td>{transaction.user_id}</td>
                    <td>{transaction.transaction_type}</td>
                    <td>{transaction.narration}</td>
                    <td>{parseFloat(transaction.amount).toLocaleString()}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.time}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className='trash-icon'
                        onClick={() => handleDeleteTxn(transaction.transaction_id)}
                      />
                </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No transactions for the selected period</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Transaction Modal */}
      {showModal && <NewTransactionModal closeModal={() => setShowModal(false)}
      onTransactionSuccess={handleTransactionSuccess} 
      />}
      
      {/* Render delete txn confirmation modal */}
      {showDeleteTxnModal && (
        <>
        <div className='modal-overlay'></div>
        <div className="delete-user-modal">
          <div className="delete-user-modal-content">
            <h2>Confirmation</h2>
            <p>Are you sure you want to delete transaction with ID: {txnToDelete}?</p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteTxn}>Remove</button>
              <button onClick={cancelDeleteTxn}>Cancel</button>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default Manage_Transactions;
