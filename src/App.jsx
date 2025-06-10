import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login/Login';
import Register from './components/auth/register';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import Admin from './components/dashboard/Admin';
import Driver from './components/dashboard/Driver';
import Passenger from './components/dashboard/Passenger';
import styles from './App.module.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.app}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/driver" 
              element={
                <ProtectedRoute allowedUserTypes={['driver']}>
                  <Driver />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/passenger" 
              element={
                <ProtectedRoute allowedUserTypes={['passenger']}>
                  <Passenger />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
