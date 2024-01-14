import React from 'react';
import LoginPage from './Component/Pages/LoginPage';
import ForeGroundPage from './Component/Pages/ForeGroundPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/foreground" element={<ForeGroundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
