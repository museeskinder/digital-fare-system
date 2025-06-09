import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login/Login';
import Register from './components/auth/register';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
