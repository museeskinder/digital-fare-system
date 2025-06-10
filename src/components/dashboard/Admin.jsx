import React from 'react';
import Navbar from '../Navbar/Navbar';
import AdminRoutes from './AdminRoutes';
import styles from './Admin.module.css';

const Admin = () => {
  return (
    <div className={styles.adminDashboard}>
      <Navbar />
      <div className={styles.content}>
        <AdminRoutes />
      </div>
    </div>
  );
};

export default Admin; 