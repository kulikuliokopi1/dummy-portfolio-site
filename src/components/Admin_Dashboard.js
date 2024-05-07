import React, { useState } from 'react';
import '../css/Admin.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUsers, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ManageUsers from './Manage_Users.js';
import ManageTransactions from './Manage_Transactions.js'; 
import AdminSettings from './Admin_Settings';


const AdminDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('ManageUsers');

  const handleMenuItemClick = (menu) => {
      setActiveMenuItem(menu);
  };

  const renderContent = () => {
      switch (activeMenuItem) {
          case 'ManageUsers':
              return <ManageUsers />;
          case 'ManageTransactions':
              return <ManageTransactions />;
          case 'AdminSettings':
              return <AdminSettings />;
          default:
              return <ManageUsers />;
      }
  };

  return (
      <div className="admin-dashboard">
          {/* Sidebar */}
          <aside className="sidebar">
              <div className='sidebar-first-div'>
                  <img src= "/assets/images/logo.png" alt="Logo" />
                  <h2>Admin</h2>
              </div>

              <div className='sidebar-second-div'>
                  <div className={`menu-item ${activeMenuItem === 'ManageUsers' ? 'active' : ''}`} onClick={() => handleMenuItemClick('ManageUsers')}>
                      <div className="menu-icon">
                          <FontAwesomeIcon icon={faUsers} />
                      </div>
                      <label className='menu-label'>Manage Users</label>
                  </div>

                  <div className={`menu-item ${activeMenuItem === 'ManageTransactions' ? 'active' : ''}`} onClick={() => handleMenuItemClick('ManageTransactions')}>
                      <div className='menu-icon'>
                          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                      </div>
                      <label className='menu-label'>Transactions</label>
                  </div>

                  <div className={`menu-item ${activeMenuItem === 'AdminSettings' ? 'active' : ''}`} onClick={() => handleMenuItemClick('AdminSettings')}>
                      <div className="menu-icon">
                          <FontAwesomeIcon icon={faGear} />
                      </div>
                      <label className='menu-label'>Admin Settings</label>
                  </div>
              </div>
          </aside>

          {/* Main Content Area */}
          <main className="main-content">
              {renderContent()}
          </main>
      </div>
  );
}

export default AdminDashboard;