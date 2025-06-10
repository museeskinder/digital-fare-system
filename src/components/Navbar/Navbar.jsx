import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = ({ userType, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProfileUpdate = (updatedData) => {
    setUserData(prev => ({
      ...prev,
      ...updatedData
    }));
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

  if (loading) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <div className={styles.profileContainer}>
          <button 
            className={styles.profileButton}
            onClick={toggleProfile}
            aria-label="Profile menu"
          >
            <FaUser className={styles.profileIcon} />
          </button>

          {isProfileOpen && (
            <div className={styles.profileDropdown}>
              {userData && (
                <div className={styles.userInfo}>
                  <p className={styles.userName}>
                    {userData.firstName} {userData.lastName}
                  </p>
                  <p className={styles.userEmail}>{userData.email}</p>
                </div>
              )}
              <button 
                className={styles.logoutButton}
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {userType === 'admin' && (
          <button className={styles.navLink}>
            Routes
          </button>
        )}
      </div>

      <button 
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {userData && (
            <div className={styles.mobileUserInfo}>
              <p className={styles.userName}>
                {userData.firstName} {userData.lastName}
              </p>
              <p className={styles.userEmail}>{userData.email}</p>
            </div>
          )}
          <button 
            className={styles.mobileLogoutButton}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 