import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { FaEdit } from 'react-icons/fa';
import styles from './AdminRoutes.module.css';

const AdminRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({
    startPoint: '',
    endPoint: '',
    tariff: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingRoute, setEditingRoute] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const routesQuery = query(collection(db, 'routes'), orderBy('startPoint'));
      const querySnapshot = await getDocs(routesQuery);
      const routesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRoutes(routesList);
    } catch (error) {
      setError('Error fetching routes: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoute(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = (route) => {
    setEditingRoute(route);
    setNewRoute({
      startPoint: route.startPoint,
      endPoint: route.endPoint,
      tariff: route.tariff.toString()
    });
  };

  const handleCancelEdit = () => {
    setEditingRoute(null);
    setNewRoute({
      startPoint: '',
      endPoint: '',
      tariff: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate inputs
    if (!newRoute.startPoint.trim() || !newRoute.endPoint.trim() || !newRoute.tariff.trim()) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    // Validate tariff is a valid number
    if (isNaN(newRoute.tariff) || parseFloat(newRoute.tariff) <= 0) {
      setError('Tariff must be a valid positive number');
      setLoading(false);
      return;
    }

    try {
      if (editingRoute) {
        // Update existing route
        await updateDoc(doc(db, 'routes', editingRoute.id), {
          startPoint: newRoute.startPoint.trim(),
          endPoint: newRoute.endPoint.trim(),
          tariff: parseFloat(newRoute.tariff),
          updatedAt: new Date()
        });
        setSuccess('Route updated successfully!');
      } else {
        // Add new route
        await addDoc(collection(db, 'routes'), {
          startPoint: newRoute.startPoint.trim(),
          endPoint: newRoute.endPoint.trim(),
          tariff: parseFloat(newRoute.tariff),
          createdAt: new Date()
        });
        setSuccess('Route added successfully!');
      }

      // Clear form
      setNewRoute({
        startPoint: '',
        endPoint: '',
        tariff: ''
      });
      setEditingRoute(null);
      
      // Refresh routes list
      await fetchRoutes();
    } catch (error) {
      setError(editingRoute ? 'Error updating route: ' + error.message : 'Error adding route: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.routesContainer}>
      <h2>Routes Management</h2>

      {/* Display existing routes */}
      <div className={styles.routesList}>
        <h3>Existing Routes</h3>
        {routes.length === 0 ? (
          <p>No routes found</p>
        ) : (
          <div className={styles.routesTable}>
            <table>
              <thead>
                <tr>
                  <th>Start Point</th>
                  <th>End Point</th>
                  <th>Tariff (Birr)</th>
                </tr>
              </thead>
              <tbody>
                {routes.map(route => (
                  <tr 
                    key={route.id} 
                    className={styles.routeRow}
                    onClick={() => handleEditClick(route)}
                  >
                    <td>{route.startPoint}</td>
                    <td>{route.endPoint}</td>
                    <td>{route.tariff.toFixed(2)}</td>
                    <div className={styles.editOverlay}>
                      <FaEdit />
                      <span>Edit</span>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit route form */}
      <div className={styles.addRouteSection}>
        <h3>{editingRoute ? 'Edit Route' : 'Add New Route'}</h3>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit} className={styles.addRouteForm}>
          <div className={styles.formGroup}>
            <label htmlFor="startPoint">Start Point</label>
            <input
              type="text"
              id="startPoint"
              name="startPoint"
              value={newRoute.startPoint}
              onChange={handleInputChange}
              placeholder="Enter start point"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="endPoint">End Point</label>
            <input
              type="text"
              id="endPoint"
              name="endPoint"
              value={newRoute.endPoint}
              onChange={handleInputChange}
              placeholder="Enter end point"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tariff">Tariff (Birr)</label>
            <input
              type="number"
              id="tariff"
              name="tariff"
              value={newRoute.tariff}
              onChange={handleInputChange}
              placeholder="Enter tariff amount"
              step="0.01"
              min="0"
            />
          </div>

          <div className={styles.formActions}>
            {editingRoute && (
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Processing...' : editingRoute ? 'Update Route' : 'Add Route'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRoutes; 