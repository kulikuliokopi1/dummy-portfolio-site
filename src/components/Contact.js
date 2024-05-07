// Contact.js

import React from 'react';
import '../css/About.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Header from './Header_file'

const Contact = () => {
  return (
    <div className="contact-container">
      <Header />
      <div className='contact-us'>
      <div className='get-help'>
            <h1>We're here to help</h1>
        <div className='get-help-items'>
            <div className='get-help-item1'>
                <img src="/assets/images/get-help-image1.png" alt='contact phone'/>
                <div className='get-help-txt1'>
                    <h2>Contact us</h2>
                    <h3 typeof='tel'>+61468962603</h3>
                        <p>Message us on WhatsApp or call to connect to the right help.</p>
                </div>
            </div>

            <div className='get-help-item2'>
                <img src="/assets/images/get-help-image2.png" alt='contact phone'/>
                <div className='get-help-txt2'>
                    <h2>Message us</h2>
                        <p>Get instant help from our virtual assistant or connect to a specialist.</p>
                </div>
            </div>

            <div className='get-help-item3'>
                <img src="/assets/images/get-help-image3.png" alt='locate branch'/>
                <div className='get-help-txt3'>
                    <h2>Find a branch</h2>
                        <p>Locate any of our  branch near you.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    {/* Social Media Icons */}
    <div className='socials'>
        <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebookF} className='socials-icon' /></a>
        <a href="https://www.linkedin.com"><FontAwesomeIcon icon={faLinkedinIn} className='socials-icon' /></a>
        <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} className='socials-icon' /></a>
        <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} className='socials-icon' /></a>
        <a href="https://www.youtube.com"><FontAwesomeIcon icon={faYoutube} className='socials-icon' /></a>
      </div>
    </div>
  );
}

export default Contact;
