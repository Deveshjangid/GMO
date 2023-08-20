import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import FormPage from './FormPage';
import SecondPage from './SecondPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form-page" element={<FormPage />} />
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
