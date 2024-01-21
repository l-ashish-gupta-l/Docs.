import React from 'react';
import LoginPage from './Component/Pages/LoginPage';
import ForeGroundPage from './Component/Pages/ForeGroundPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddForm from './Component/AddForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/foreground" element={<ForeGroundPage />} />
        <Route path="/addpage" element={<AddForm />} />
      </Routes>
    </Router>
  );
}

export default App;
