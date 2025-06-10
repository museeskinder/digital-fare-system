import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { FaEdit, FaSearch } from 'react-icons/fa';
import styles from './AdminRoutes.module.css';

const AdminRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    // Filter routes based on search term
    if (searchTerm.trim() === '') {
      setFilteredRoutes(routes);
    } else {
      const filtered = routes.filter(route => 
        route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.endPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.tariff.toString().includes(searchTerm)
      );
      setFilteredRoutes(filtered);
    }
  }, [searchTerm, routes]);

  const fetchRoutes = async () => {
    try {
      const routesQuery = query(collection(db, 'routes'), orderBy('startPoint'));
      const querySnapshot = await getDocs(routesQuery);
      const routesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRoutes(routesList);
      setFilteredRoutes(routesList);
    } catch (error) {
      setError('Error fetching routes: ' + error.message);
    }
  };

  const handleSearch = () => {
    // Search is handled automatically by useEffect
    // This function can be used for additional search logic if needed
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

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchInput}>
          <input
            type="text"
            placeholder="Search routes by start point, end point, or tariff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className={styles.searchButton}
            onClick={handleSearch}
          >
            <FaSearch />
            Search Routes
          </button>
        </div>
        
        {/* Display routes results */}
        <div className={styles.routesList}>
          {filteredRoutes.length === 0 ? (
            <p className={styles.noRoutes}>{searchTerm ? 'No routes found matching your search.' : 'No routes found'}</p>
          ) : (
            <>
              {/* Desktop table view */}
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
                    {filteredRoutes.map(route => (
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

              {/* Mobile card view */}
              <div className={styles.routesCards}>
                {filteredRoutes.map(route => (
                  <div 
                    key={route.id} 
                    className={styles.routeCard}
                    onClick={() => handleEditClick(route)}
                  >
                    <div className={styles.routeCardContent}>
                      <div className={styles.routeInfo}>
                        <div className={styles.routePoint}>
                          <strong>From:</strong> {route.startPoint}
                        </div>
                        <div className={styles.routePoint}>
                          <strong>To:</strong> {route.endPoint}
                        </div>
                        <div className={styles.routeTariff}>
                          <strong>Tariff:</strong> {route.tariff.toFixed(2)} Birr
                        </div>
                      </div>
                      <div className={styles.routeCardActions}>
                        <button 
                          className={styles.mobileEditButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(route);
                          }}
                        >
                          <FaEdit />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
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