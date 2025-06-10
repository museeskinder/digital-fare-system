import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import Navbar from '../Navbar/Navbar';
import AdminRoutes from './AdminRoutes';
import styles from './Admin.module.css';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <Navbar userType="admin" onLogout={handleLogout} />
      <div className={styles.content}>
        <AdminRoutes />
      </div>
    </div>
  );
};

export default Admin; 