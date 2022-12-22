import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './Context/DataProvider';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataProvider>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </DataProvider>
);
