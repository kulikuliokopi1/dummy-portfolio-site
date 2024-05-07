// Footer.js

import React from 'react';
import '../css/Footer.css'; // Import CSS file for styling

const Footer = () => {
const currentYear = new Date().getFullYear();
  return (
    <div className="footer-container">
      <div className='footer-items'>
        <div className="company-info">
          <p>&copy; {currentYear} Commonwealth Bank. All rights reserved.</p>
         
        </div>
      </div>
    </div>
  );
}

export default Footer;

