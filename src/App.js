import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import './css/App.css'
import Header from './pages/Header';
import Case1Page from './pages/Case1Page';
import Case2Page from './pages/Case2Page';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/case1"
          element={<Case1Page />}
        />
        <Route
          path="/case2"
          element={<Case2Page />}
        />
    </Routes>
    </Router>
  );
};

export default App;




<Route path="/admin" element={<AdminPage />} />
