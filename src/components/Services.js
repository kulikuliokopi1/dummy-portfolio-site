// Services.js

import React from 'react';
import '../css/Services.css'; 

const Services = () => {
  return (
    <div className="services-container">
        <div className='services-contents'>
            <div className='services-content1'>
                <img src="/assets/images/services-image1.png" alt='industry tailored services'/>
                <div className='services-txt1'>
                    <h2>Industry tailored services</h2>
                    <p>Banking products and services, tailored industry solutions and powerful tools to help your business thrive.</p>
                </div>
            </div>

            <div className='services-content2'>
                <div className='services-txt2'>
                    <h2>Financial solutions for everybody</h2>
                    <p>We have a range of solutions and initiatives tailored for individual, family, students, and young adults.</p>
                </div> 
                <img src="/assets/images/services-image2.png" alt='financial solutions for everyone'/>
            </div>

            <div className='services-content3'>
                <img src="/assets/images/services-image3.jpg" alt='24/7 support'/>
                <div className='services-txt3'>
                    <h2>Message us 24/7</h2>
                    <p>Get instant help from a specialist who can message you back. Get help on account and make enquiries on all services.</p>
                </div>
            </div>
            <div className='services-content4'>
                <img src="/assets/images/services-image4.jpg" alt='24/7 support'/>
                <div className='services-txt4'>
                    <h2>Access your money anytime, anywhere</h2>
                    <p>With a dedicated user dashboard, you'll have access to a range of features to help you keep track of your finance and gain insights on your savings and withdrawals.</p>
                    </div>
                </div>
        </div>

        <div className='get-help'>
            <h1>We're here to help</h1>
        <div className='get-help-items'>
            <div className='get-help-item1'>
                <img src="/assets/images/get-help-image1.png" alt='contact phone'/>
                <div className='get-help-txt1'>
                    <h2>Contact us</h2>
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
  );
}

export default Services;
