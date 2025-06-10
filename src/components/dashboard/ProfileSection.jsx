import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import styles from './ProfileSection.module.css';

const ProfileSection = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!userData) {
    return <div className={styles.error}>Failed to load profile data</div>;
  }

  return (
    <div className={styles.profileSection}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          {userData.firstName?.[0]}{userData.lastName?.[0]}
        </div>
      </div>
      <div className={styles.userInfo}>
        <h3>{userData.firstName} {userData.lastName}</h3>
        <p className={styles.email}>{userData.email}</p>
        <p className={styles.userType}>Account Type: {userData.userType}</p>
        {userData.phoneNumber && (
          <p className={styles.phone}>Phone: {userData.phoneNumber}</p>
        )}
        {userData.plateNumber && (
          <p className={styles.plate}>Plate Number: {userData.plateNumber}</p>
        )}
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

export default ProfileSection; 