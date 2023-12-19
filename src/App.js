// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

const App = () => {
  const [isAdmin, setAdminStatus] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage setAdminStatus={setAdminStatus} />}
        />
        <Route
          path="/admin"
          element={<AdminPage isAdmin={isAdmin} />}
        />
        <Route
          path="/login"
          element={<LoginPage setAdminStatus={setAdminStatus} />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
