import { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [showPhone, setShowPhone] = useState(false);
  
  // Mock user data - in real app, this would come from your auth context/state
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1 (555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?u=john-doe' // Fixed avatar URL
  };

  const togglePhone = () => {
    setShowPhone(!showPhone);
  };

  // Format phone number to show only country code and first 3 digits
  const formatPhoneNumber = (phone) => {
    const match = phone.match(/^(\+\d{1,3})\s*\((\d{3})\)/);
    if (match) {
      const [, countryCode, firstThree] = match;
      return showPhone 
        ? phone 
        : `${countryCode} (${firstThree}) ••••-••••`;
    }
    return phone;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        FarePay
      </div>
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <img src={userData.avatar} alt="Profile" className={styles.avatar} />
          <div className={styles.userDetails}>
            <span className={styles.name}>{`${userData.firstName} ${userData.lastName}`}</span>
            <div className={styles.phoneContainer}>
              <span className={styles.phone}>
                {formatPhoneNumber(userData.phoneNumber)}
              </span>
              <button 
                onClick={togglePhone} 
                className={styles.toggleButton}
                aria-label={showPhone ? 'Hide phone number' : 'Show phone number'}
              >
                {showPhone ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <span className={styles.userType}>Passenger</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 