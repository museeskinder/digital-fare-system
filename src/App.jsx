import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login/Login';
import Register from './components/auth/register';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import Admin from './components/dashboard/Admin';
import Driver from './components/dashboard/Driver';
import Passenger from './components/dashboard/Passenger';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/passenger" element={<Passenger />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
