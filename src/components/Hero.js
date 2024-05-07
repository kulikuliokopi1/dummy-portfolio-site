// About.js

import React from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../css/Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
        <div className="hero-image">
        <img src="/assets/images/hero-image.png" alt="hero" />
      </div>
      <div className='banner-content'>
      <div className='banner-content-inner'>
        <h1>Banking</h1>
        <p>Whatever your financial goals, we help you save, and provide you with the funds needed for your projects.</p>
        </div>
      </div>

      <div className='banner-content2'>
        <div className='savings'>
            <img src="/assets/images/icon1.png" alt='savings-icon' />
            <div>
                <h3>Savings</h3>
                <Link to="/contact">
                <p>Start now!</p>
                </Link>
            </div>
        </div>
        <div className='divider'></div>
        <div className='loans'>
        <img src="/assets/images/icon2.png" alt='loans-icon' />
            <div>
                <h3>Loans</h3>
                <Link to="/contact">
                <p><span>Learn more</span><FontAwesomeIcon icon={faArrowRight} /><span></span></p>
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;
