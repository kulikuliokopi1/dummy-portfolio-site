import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../css/Admin.css';
import { API_URLS } from '../api';

export const UserCreateTransaction = ({ userId, closeModal }) => {
    const [receiverId, setReceiverId] = useState('');
    const [amount, setAmount] = useState('');
    const [formattedAmount, setFormattedAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [narration, setNarration] = useState(`Transfer from ${userId}`);
    const transactionTypeReceiver = 'Cr';
    const transactionType = 'Dr';
    const senderNarration = `Transfer to ${receiverId}`;
    const [gatewayStatus, setGatewayStatus] = useState('');
    const [gatewayAlert, setGatewayAlert] = useState('');
    const [showGatewayAlert, setShowGatewayAlert] = useState(false);
    const [renderContent, setRenderContent] = useState(null);

    
    useEffect(() => {
      // Fetch gateway status and alert
      fetchGatewayStatus();
      // eslint-disable-next-line 
  }, []);

  const fetchGatewayStatus = () => {
    axios.get(API_URLS.GATEWAY_STATUS_AND_ALERT)
        .then(response => {
            const status = response.data.status;
            const alert = response.data.alert;
            setGatewayStatus(status);
            setGatewayAlert(alert);
            console.log(gatewayStatus)
        })
        .catch(error => {
            console.error('Error fetching gateway status:', error);
        });
};

const handleConfirmTransaction = () => {
  if (gatewayStatus === 'closed') {
      // Render the gateway alert
      setShowGatewayAlert(true);
  } else {
      // Proceed with transaction confirmation
      confirmTransaction();
  }
};

    // Function to format amount input with commas
    const formatAmount = (value) => {
        // Match every three digits from the end of the string
        const regex = /(\d)(?=(\d{3})+(?!\d))/g;
        // Insert commas between matched groups
        return value.replace(regex, '$1,');
    };

    // Function to handle amount input change
    const handleAmountChange = (e) => {
        const inputValue = e.target.value;
        // Remove commas from the input value
        const inputValueWithoutCommas = inputValue.replace(/,/g, '');
        // Format the input value without commas
        const formattedValue = formatAmount(inputValueWithoutCommas);
        setAmount(inputValueWithoutCommas); // Store the input value without commas
        setFormattedAmount(formattedValue);
        setErrorMessage('');
    };
    


    const handleReceiverIdChange = (e) => {
        const newValue = e.target.value;
        setReceiverId(newValue);
        setErrorMessage('');
    
        // Check if the receiver ID matches certain values
        if (newValue === '06050268597' || newValue === '19100045519') {
            console.log('receiver id is:', newValue);
            setRenderContent(
                <>
                    <p className='styled' onClick={() => handleBankSelection(newValue)}>Hong Leong Bank</p>
                    <p className='styled' onClick={handleErrorBankSelection}>CIMB</p>
                    <p className='styled' onClick={handleErrorBankSelection}>Maybank</p>
                    <p className='styled' onClick={handleErrorBankSelection}>AmBank </p>
                    <p className='styled' onClick={handleErrorBankSelection}>Alliance Bank</p>
                    <p className='styled' onClick={handleErrorBankSelection}>Public Bank</p>
                    <p className='styled' onClick={handleErrorBankSelection}>RHB Bank</p>
                </>
            );
        } else {
            setRenderContent(null);
        }
    };
    

    const handleBankSelection = (newValue) =>  {
        if (newValue === '06050268597') {
            setRenderContent(
                <>
                    <p className='no-margin'>Account Name:</p>
                    <p className='name'>Jennifer Jok</p>
                    <input placeholder="Enter Swift Code" />
                </>
            );
        } else if (newValue === '19100045519') {
            setRenderContent(
                <>
                    <p className='no-margin'>Account Name:</p>
                    <p className='name'>Tan Huey Cheng</p>
                    <input placeholder="Enter Swift Code" />
                </>
            );
        }
    };
    

    const handleErrorBankSelection = () => {
        setRenderContent(
            <>
                <p>Account not found</p>
                <p onClick={() => setRenderContent(null)}>Please try again</p>
            </>
        );
    };

    
    

    const confirmTransaction = () => {
        // Send POST request to server
        axios.post(API_URLS.USER_CREATE_NEW_TRANSACTION, {
            userId,
            receiverId,
            amount,
            transactionType,
            transactionTypeReceiver,
            narration,
            senderNarration,
        })
        .then(response => {
            alert('Transaction successful!');
            closeModal(); // Close modal after successful transaction
        })
        .catch(error => {
            alert('Error making transaction:', error.response.data.error);
            // Set the error message state
            setErrorMessage(error.response.data.error);
        });
    };

    const closeGatewayAlert = () => {
        setShowGatewayAlert(false);
    }

    
    return (
      <>
      <div className='modal-overlay'></div>
        <div className="txn-modal-container">
            <div className="modal">
                <div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                
                    {showGatewayAlert && gatewayStatus === 'closed' && (
                                <>
                                <div className='modal-overlay2'></div>
                                <div className='close-alert'>
                                <FontAwesomeIcon icon={faWindowClose} className='close-alert-icon' onClick={closeGatewayAlert} />
                                </div>
                                <div className="user-gateway-alert">
                                    <div className='alert-header'>
                                        <img src='/assets/images/logo.png' alt='company-logo' />
                                        <h3><span>Dummy-Portfolio</span><span> Site</span></h3>
                                    </div>
                                    <div className='failed'>
                                        <div className='icon-div'>
                                    <FontAwesomeIcon icon={faExclamationTriangle} className='icon'/>
                                        <h3>FAILED!</h3>
                                        </div>
                                        <p>{gatewayAlert}</p>
                                        </div>
                                
                                </div>
                                </>
                            )}
                <div className='close-txn-modal'>
                    <FontAwesomeIcon icon={faWindowClose} className='close-txn-modal-icon' onClick={closeModal} />
                </div>
                <h2>New Transaction</h2>
                <form>
                    <div className="form-group">
                        <label>Transfer To:</label>
                        <input type="text" value={receiverId} onChange={handleReceiverIdChange} />
                    </div>
                    {renderContent && (
                            <div className="render-div">
                                {renderContent}
                            </div>
                        )}
                    <div className="form-group">
                        <label>Amount (AUD):</label>
                        <input type="text" value={formattedAmount} onChange={handleAmountChange} />
                    </div>
                    <div className="form-group">
                        <label>Narration:</label>
                        <input type="text" value={narration} onChange={(e) => setNarration(e.target.value)} />
                    </div>
                    <button type="button" onClick={handleConfirmTransaction}>Confirm Transaction</button>
                </form>
            </div>
            
        </div>
        
        </> 
    ); 
};

export default UserCreateTransaction;
