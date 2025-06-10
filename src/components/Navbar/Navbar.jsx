import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaEdit } from 'react-icons/fa';
import styles from './Navbar.module.css';
import EditProfileModal from '../dashboard/EditProfileModal';

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const fetchUserData = async (user) => {
    try {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        setUserData(null);
        setLoading(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileOpen(false);
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleProfileUpdate = async (updatedData) => {
    setUserData(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  if (loading) {
    return null;
  }

  if (!userData) {
    return null;
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <h1>Digital Fare</h1>
          </div>

          {/* Mobile Menu Button */}
          <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile Menu */}
          <div 
            ref={mobileMenuRef}
            className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
          >
            <div className={styles.mobileUserInfo}>
              <div className={styles.avatar}>
                {userData.firstName?.[0]}{userData.lastName?.[0]}
              </div>
              <div className={styles.userDetails}>
                <h3>{userData.firstName} {userData.lastName}</h3>
                <p>{userData.email}</p>
                <p className={styles.userType}>{userData.userType}</p>
              </div>
            </div>
            {(userData.userType === 'driver' || userData.userType === 'passenger') && (
              <button onClick={handleEditProfile} className={styles.editButton}>
                <FaEdit /> Edit Profile
              </button>
            )}
            <button onClick={handleLogout} className={styles.mobileLogoutButton}>
              <FaSignOutAlt /> Logout
            </button>
          </div>

          {/* Desktop Profile Section */}
          <div className={styles.profileSection} ref={profileRef}>
            <button className={styles.avatarButton} onClick={toggleProfile}>
              <div className={styles.avatar}>
                {userData.firstName?.[0]}{userData.lastName?.[0]}
              </div>
            </button>

            {isProfileOpen && (
              <div className={styles.profileDropdown}>
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
                {(userData.userType === 'driver' || userData.userType === 'passenger') && (
                  <button onClick={handleEditProfile} className={styles.editButton}>
                    <FaEdit /> Edit Profile
                  </button>
                )}
                <button onClick={handleLogout} className={styles.logoutButton}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  );
};

export default Navbar; 