
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap CSS
import App from './App'; // Assuming App.js is in the same directory as index.js
import './index.css'; // Any global CSS you might have

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
