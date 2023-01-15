import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import { DataProvider } from './Context/DataProvider';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </DataProvider>
);
