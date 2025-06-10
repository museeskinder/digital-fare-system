import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = ({ onLogout }) => {
  const { userData, updateUserData } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileUpdate = (updatedData) => {
    updateUserData(updatedData);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${styles.profileContainer}`)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo}>
          <h1>Digital Fare System</h1>
        </div>

        {/* Mobile menu button */}
        <button className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop menu */}
        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <div className={styles.userInfo}>
            <span>Welcome, {userData.firstName} {userData.lastName}</span>
            <span className={styles.userType}>({userData.userType})</span>
          </div>

          <div className={styles.profileContainer}>
            <button className={styles.profileButton} onClick={toggleProfile}>
              <FaUser />
              <span className={styles.profileName}>
                {userData.firstName} {userData.lastName}
              </span>
            </button>

            {isProfileOpen && (
              <div className={styles.profileDropdown}>
                <div className={styles.profileInfo}>
                  <h3>{userData.firstName} {userData.lastName}</h3>
                  <p>{userData.email}</p>
                  <p>{userData.phoneNumber}</p>
                  {userData.userType === 'driver' && userData.plateNumber && (
                    <p>Plate: {userData.plateNumber}</p>
                  )}
                </div>
                
                {(userData.userType === 'driver' || userData.userType === 'passenger') && (
                  <button 
                    className={styles.editProfileButton}
                    onClick={() => {
                      // This will be handled by the parent component
                      if (window.editProfile) {
                        window.editProfile();
                      }
                    }}
                  >
                    Edit Profile
                  </button>
                )}
                
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 