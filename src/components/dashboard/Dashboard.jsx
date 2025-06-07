import { useState } from 'react';
import styles from './Dashboard.module.css';
import RefillModal from '../modals/RefillModal';

const Dashboard = () => {
  // Mock data - replace with actual data from your backend
  const [balance, setBalance] = useState(100.00);
  const [showBalance, setShowBalance] = useState(false);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
  const [trips] = useState([
    { id: 1, date: '2024-03-20', route: 'Downtown to Airport', fare: 15.50 },
    { id: 2, date: '2024-03-19', route: 'Airport to Downtown', fare: 15.50 },
    { id: 3, date: '2024-03-18', route: 'Downtown to University', fare: 8.75 },
  ]);

  const handleRefill = () => {
    setIsRefillModalOpen(true);
  };

  const handleRefillSubmit = (amount) => {
    // TODO: Send amount to backend
    console.log('Refill amount:', amount);
  };

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  const formatBalance = (amount) => {
    return showBalance ? `$${amount.toFixed(2)}` : '$******';
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.balanceSection}>
        <div className={styles.balanceCard}>
          <h2>Current Balance</h2>
          <div className={styles.balanceContainer}>
            <p className={styles.balance}>
              {formatBalance(balance)}
            </p>
            <button 
              onClick={toggleBalance} 
              className={styles.toggleButton}
              aria-label={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          <button onClick={handleRefill} className={styles.refillButton}>
            Refill Balance
          </button>
        </div>
      </div>

      <div className={styles.tripsSection}>
        <h2>Recent Trips</h2>
        <div className={styles.tripsList}>
          {trips.map((trip) => (
            <div key={trip.id} className={styles.tripCard}>
              <div className={styles.tripInfo}>
                <h3>{trip.route}</h3>
                <p className={styles.tripDate}>{trip.date}</p>
              </div>
              <div className={styles.tripFare}>
                <p>${trip.fare.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RefillModal
        isOpen={isRefillModalOpen}
        onClose={() => setIsRefillModalOpen(false)}
        onSubmit={handleRefillSubmit}
      />
    </div>
  );
};

export default Dashboard; 