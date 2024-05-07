import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTimePicker from './Custom_Time_Picker';
import { API_URLS } from '../api';

const NewTransactionModal = ({ closeModal, onTransactionSuccess }) => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [transactionType, setTransactionType] = useState('Cr');
  const [useCustomDateTime, setUseCustomDateTime] = useState(false);
  const [customDate, setCustomDate] = useState(new Date());
  const [customTime, setCustomTime] = useState('00:00');
  const [errorMessage, setErrorMessage] = useState('');
  const [narration, setNarration] = useState('');

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
};



  const handleConfirmTransaction = () => {
    // Send POST request to server
    const dateToUse = useCustomDateTime ? customDate.toLocaleDateString() : new Date().toLocaleDateString();
    const timeToUse = useCustomDateTime ? customTime : new Date().toLocaleTimeString();
    axios.post(API_URLS.ADMIN_CREATE_NEW_TRANSACTION, {
      userId,
      amount,
      transactionType,
      narration,
      date: dateToUse,
      time: timeToUse
    })
    .then(response => {
      alert('Transaction Successful!');
      onTransactionSuccess(); //Refresh the transactions table
      closeModal(); // Close modal after successful transaction
    })
    .catch(error => {
      console.error('Error making transaction:', error.response.data.error);
      // Set the error message state
      setErrorMessage(error.response.data.error);
    });
  };

  return (
    <div className="txn-modal-container">
      <div className="modal">
        <div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className='close-txn-modal'><FontAwesomeIcon icon={faWindowClose} className='close-txn-modal-icon' onClick={closeModal} /></div>
        <h2>New Transaction</h2>
        <form>
          <div className="form-group">
            <label>User ID:</label>
            <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Amount (AUD):</label>
            <input type="text" value={formattedAmount} onChange={handleAmountChange} />
          </div>
          <div className="form-group">
            <label>Transaction Type:</label>
            <select className='txn-type' value={transactionType} onChange={e => setTransactionType(e.target.value)}>
              <option value="Cr">Credit</option>
              <option value="Dr">Debit</option>
            </select>
            <div className="form-group">
              <label>Narration:</label>
              <input type="text" value={narration} onChange={(e) => setNarration(e.target.value)} />
            </div>

            <p className='date-time-option' type="button" onClick={() => setUseCustomDateTime(!useCustomDateTime)}>
            {useCustomDateTime ? 'Use actual date/time?' : 'Use custom date/time?'}
          </p>
          </div>
          {useCustomDateTime ? (
            <>
              <div className="form-group">
                <label>Custom Date:</label>
                <DatePicker selected={customDate} onChange={date => setCustomDate(date)} />
              </div>
              <div className="form-group">
                <label>Custom Time:</label>
                <CustomTimePicker value={customTime} onChange={setCustomTime} />
              </div>
            </>
          ) : null}
          <button type="button" onClick={handleConfirmTransaction}>Confirm Transaction</button>
          
        </form>
      </div>
    </div>
  );
};

export default NewTransactionModal;
