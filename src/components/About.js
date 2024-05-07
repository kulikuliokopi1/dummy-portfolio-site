// About.js

import React from 'react';
import Header from './Header_file';
import Footer from './Footer';
import '../css/About.css'; // Import CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <Header />
      <div className='our-company'>
        <div className='about-hero'>
      <img src="/assets/images/our-company.jpg" alt="Our Company" />
      </div>

        <div className='our-company-txt'>
      <h2>Dummy-Portfolio Site About</h2>
      </div>
      </div>
      <div className='about-body'>
      <p>We are guided by our purpose - building a brighter future for all.</p>
      <p>Our strategy , to build tomorrow's bank today for our customers, reflects our commitment to use the strength of DPS to support our customers, invest in our communities and provide strength and stability for the broader economy.</p>
      <p>We are a leading banks, serving millions of customers. We focus on providing retail and commercial banking services.</p>
      <p>Our products and services are provided through our divisions, Retail Banking Services, Business Banking, Institutional Banking and Markets.</p>
      <p>We are a world class financial institution.</p>
    </div>
    <Footer />
    </div>
  );
}

export default About;
