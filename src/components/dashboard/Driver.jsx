import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navbar/Navbar';
import EditProfileModal from './EditProfileModal';
import styles from './Dashboard.module.css';

const Driver = () => {
  const { userData } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleProfileUpdate = (updatedData) => {
    // Profile update is handled by the AuthContext
  };

  // Make editProfile function globally available for navbar
  React.useEffect(() => {
    window.editProfile = handleEditProfile;
    return () => {
      delete window.editProfile;
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <h1>Driver Dashboard</h1>
        <p>Welcome to the driver dashboard! This page is working correctly.</p>
        
        {userData && (
          <div className={styles.profileInfo}>
            <h2>Profile Information</h2>
            <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phoneNumber}</p>
            <p><strong>Plate Number:</strong> {userData.plateNumber}</p>
            <p><strong>User Type:</strong> {userData.userType}</p>
          </div>
        )}
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  );
};

export default Driver; 