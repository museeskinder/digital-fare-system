import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    plateNumber: '',
    password: '',
    confirmPassword: '',
    userType: 'passenger'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (formData.userType === 'driver' && !formData.plateNumber.trim()) {
      newErrors.plateNumber = 'Plate number is required for drivers';
    } else if (formData.userType === 'driver' && !/^[1-9]-[A-Z]{2,3}-[0-9]{4}$/.test(formData.plateNumber)) {
      newErrors.plateNumber = 'Please enter a valid plate number (e.g., 3-ABC-1234)';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically make an API call to register the user
      setSuccess('Registration successful!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        plateNumber: '',
        password: '',
        confirmPassword: '',
        userType: 'passenger'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleUserType = (type) => {
    setFormData(prev => ({
      ...prev,
      userType: type,
      plateNumber: '' // Clear plate number when switching user type
    }));
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.userTypeToggle}>
          <button
            className={`${styles.toggleBtn} ${formData.userType === 'passenger' ? styles.active : ''}`}
            onClick={() => toggleUserType('passenger')}
          >
            Passenger
          </button>
          <button
            className={`${styles.toggleBtn} ${formData.userType === 'driver' ? styles.active : ''}`}
            onClick={() => toggleUserType('driver')}
          >
            Driver
          </button>
        </div>

        <h2>Register as {formData.userType}</h2>
        
        {success && <div className={styles.successMessage}>{success}</div>}
        
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            {errors.firstName && <div className={styles.errorMessage}>{errors.firstName}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            {errors.lastName && <div className={styles.errorMessage}>{errors.lastName}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+2519XXXXXXX"
              maxLength="10"
            />
            {errors.phoneNumber && <div className={styles.errorMessage}>{errors.phoneNumber}</div>}
          </div>

          {formData.userType === 'driver' && (
            <div className={styles.formGroup}>
              <label htmlFor="plateNumber">Vehicle Plate Number</label>
              <input
                type="text"
                id="plateNumber"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="3-ABC-1234"
                maxLength="10"
              />
              {errors.plateNumber && <div className={styles.errorMessage}>{errors.plateNumber}</div>}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div className={styles.errorMessage}>{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className={styles.btnPrimary}>Register</button>
        </form>

        <div className={styles.loginLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 