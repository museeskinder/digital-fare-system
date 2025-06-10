import React from 'react';
import styles from './Dashboard.module.css';
import Navbar from '../Navbar/Navbar';

const Admin = () => {
  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard! This page is working correctly.</p>
      </div>
    </>
  );
};

export default Admin; 