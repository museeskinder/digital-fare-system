import { useState } from 'react';
import styles from './RefillModal.module.css';

const RefillModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    // Submit the amount
    onSubmit(numAmount);
    setIsSubmitted(true);
    
    // Close modal after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <h3>Refill Balance</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="amount">Enter the amount you want</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                placeholder="Enter amount"
                step="0.01"
                min="0"
              />
              {error && <span className={styles.error}>{error}</span>}
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit to Admin
            </button>
          </form>
        ) : (
          <div className={styles.successMessage}>
            Successfully submitted to admin
          </div>
        )}
      </div>
    </div>
  );
};

export default RefillModal; 