import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SmartphonesPage from './categories/SmartphonesPage';
import ComputersPage from './categories/ComputersPage';
import AccessoriesPage from './categories/AccessoriesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/smartphones" element={<SmartphonesPage />} />
        <Route path="/computers" element={<ComputersPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
