import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaBars, FaTimes, FaRoute } from 'react-icons/fa';
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
    console.log('Toggle menu clicked, current state:', isMenuOpen);
    setIsMenuOpen(prev => !prev);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log('Profile button clicked, current state:', isProfileOpen);
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleClickOutside = (e) => {
    // Close profile dropdown if clicking outside
    if (!e.target.closest(`.${styles.profileContainer}`)) {
      setIsProfileOpen(false);
    }
  };

  const handleBackdropClick = () => {
    setIsMenuOpen(false);
  };

  const handleRoutesClick = () => {
    // For admin users, this could scroll to routes section or navigate
    // For now, we'll just close the mobile menu
    setIsMenuOpen(false);
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

        {/* Desktop Routes Link - Only for Admin */}
        {userData.userType === 'admin' && (
          <div className={styles.desktopNav}>
            <button 
              className={styles.routesLink}
              onClick={handleRoutesClick}
            >
              Routes
            </button>
          </div>
        )}

        {/* Mobile menu button */}
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMenu}
          type="button"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop menu */}
        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
          {/* Welcome message - hidden on mobile when menu is open */}
          <div className={`${styles.userInfo} ${isMenuOpen ? styles.hiddenOnMobile : ''}`}>
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

          {/* Mobile-only action buttons */}
          <div className={`${styles.mobileActions} ${isMenuOpen ? styles.showOnMobile : ''}`}>
            {/* Mobile Routes Link - Only for Admin */}
            {userData.userType === 'admin' && (
              <button 
                className={styles.mobileRoutesButton}
                onClick={handleRoutesClick}
              >
                <FaRoute />
                Routes
              </button>
            )}

            {(userData.userType === 'driver' || userData.userType === 'passenger') && (
              <button 
                className={styles.mobileEditProfileButton}
                onClick={() => {
                  if (window.editProfile) {
                    window.editProfile();
                  }
                  setIsMenuOpen(false);
                }}
              >
                Edit Profile
              </button>
            )}
            
            <button 
              className={styles.mobileLogoutButton} 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className={styles.mobileBackdrop}
          onClick={handleBackdropClick}
        />
      )}
    </nav>
  );
};

export default Navbar; 