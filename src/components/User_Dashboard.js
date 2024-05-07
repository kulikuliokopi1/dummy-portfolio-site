import React, { useState, useEffect } from 'react';
import '../css/User_Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { UserCreateTransaction } from './User_Create_Transaction'; 
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../api.js';

const UserDashboard = () => {
    const location = useLocation();
    const [transactions, setTransactions] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const user = location.state.user;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchTransactions = (url) => {
                axios.get(url)
                    .then(response => {
                        setTransactions(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching transactions:', error);
                    });
            };

            // Fetch transactions based on user ID
            
            const searchUrl = `${API_URLS.USER_TRANSACTIONS}${user.user_id}`;
            fetchTransactions(searchUrl);
        }
    }, [user]); 

    useEffect(() => {
        // Fetch transactions based on selected period or custom dates
        const url = getUrlForSelectedPeriod();
        if (url) {
            fetchTransactions(url);
        }
    }, [selectedPeriod, startDate, endDate]);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchTransactions = (url) => {
        axios.get(url)
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    };

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

    const handleFundsTransfer = () => {
        setShowModal(true); 
    };

    return (
        <div className="user-dashboard">
            {showModal && (
                    <UserCreateTransaction 
                    userId={user.user_id} 
                    closeModal={() => setShowModal(false)}/>
            )}
            <div className='logo-div'>
                <img src='/assets/images/logo.png' alt='logo'/>
                <h4><span>Dummy-Portfolio</span><span>Site</span></h4>
            </div> 
            <div className='backdrop'></div>
            <div className='user-overview'>
                {/* User profile */}
                <div className='user'>
                    <div className='profile'>
                        <div className='image-contain'>
                            <img src={user.image} alt="User" />
                        </div>
                        <div>
                            <div className='greetings'><span>Hello, </span><span>{user.last_name}</span></div>
                            <div className='user-id'>{user.user_id}</div>
                        </div>
                    </div>
                    <button onClick={() => navigate('/User_Details', { state: { userId: user.user_id } })} className='user-profile'>View Profile</button>
                </div>
                {/* Available balance */}
                <div className='available-bal'>
                    <div className='bal-content'>
                        <p>Available Balance</p>
                        <div className='fetched-bal'>
                            <span>AUD</span>
                            <span>{parseFloat(user.balance).toLocaleString()}.00</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Transfer button */}
            <div className='transfer-container'>
                <button className='transfer' onClick={handleFundsTransfer}>
                    <span><FontAwesomeIcon icon={faAnglesRight} /></span>
                    <span>Transfer Funds</span>
                </button>
            </div>
            {/* Recent transactions */}
            <div className='recent-txn-header'>
                    <p>Recent Transactions</p>
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
            <div className='user-recent-txn'>
                <div className='recent-txn'>
                    <table>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Transaction Type</th>
                                <th>Narration</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <tr key={transaction.id}>
                                        <td>{index + 1}</td>
                                        <td>{transaction.transaction_type}</td>
                                        <td>{transaction.narration}</td>
                                        <td>{parseFloat(transaction.amount).toLocaleString()}</td>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.time}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No Transaction History to Show.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;