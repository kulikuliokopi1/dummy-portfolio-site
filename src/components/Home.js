// Home.js

import React, { useState } from 'react';
import '../css/Home.css'; // Import CSS file for styling
import Header from './Header_file.js';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import About from './About.js';
import Contact from './Contact.js';
import LogIn from './LogIn.js';
import Admin from './Admin.js';
import AdminDashboard from './Admin_Dashboard.js';
import UserDashboard from './User_Dashboard.js';
import Hero from './Hero.js';
import Services from './Services.js';
import Footer from './Footer.js';
import UserDetails from './User_Details.js';
import CreatedUserDetails from './Created_User_Details.js';
import UpdateUserDetails from './Update_User_Details.js';
import UserCreateTransaction from './User_Create_Transaction.js'

const Home = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <Router>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/user_details' element={<UserDetails/>} />
            <Route path='/created_user_details' element={<CreatedUserDetails setIsAdminLoggedIn={setIsAdminLoggedIn}/>} />
            <Route path='/update_user_details' element={<UpdateUserDetails setIsAdminLoggedIn={setIsAdminLoggedIn}/>} />
            <Route path='/user_create_transaction' element={<UserCreateTransaction setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path='/login' element={<LogIn setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path='/admin' element={<Admin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
 
            <Route
          path="/admin_dashboard"
          element={<RenderedAdminRoute isAdminLoggedIn={isAdminLoggedIn} />}
        />
        <Route
          path="/user_dashboard"
          element={<RenderedUserRoute isUserLoggedIn={isUserLoggedIn} />}
        />
          </Routes>
    </Router>
  );
}

const HomePage = () => {
    return (
      <div className="Home_container">
        <div className='rest'>
          <Header />
        <Hero />
        <Services />
        <Footer />
        </div>
        </div>
    );
  }


  const RenderedAdminRoute = ({ isAdminLoggedIn }) => {
    return isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin" />;
  };
  
  const RenderedUserRoute = ({ isUserLoggedIn }) => {
    return isUserLoggedIn ? <UserDashboard /> : <Navigate to="/login" />;
  };

export default Home;
