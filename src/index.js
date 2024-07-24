import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import ThemeProvider from './Context/ThemeProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </Router>
  </React.StrictMode>
);
