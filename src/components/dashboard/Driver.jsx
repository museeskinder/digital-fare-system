import React from 'react';
import styles from './Dashboard.module.css';
import Navbar from '../Navbar/Navbar';

const Driver = () => {
  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <h1>Driver Dashboard</h1>
        <p>Welcome to the driver dashboard! This page is working correctly.</p>
      </div>
    </>
  );
};

export default Driver; 