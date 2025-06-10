import React from 'react';
import styles from './Dashboard.module.css';
import Navbar from '../Navbar/Navbar';

const Passenger = () => {
  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <h1>Passenger Dashboard</h1>
        <p>Welcome to the passenger dashboard! This page is working correctly.</p>
      </div>
    </>
  );
};

export default Passenger; 