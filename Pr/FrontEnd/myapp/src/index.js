import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Only one Router should wrap the App at the root level
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router> {/* Router should only be here, not inside other components */}
      <App />
    </Router>
  </React.StrictMode>
);
