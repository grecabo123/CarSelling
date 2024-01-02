import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './app.css'
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min.js'

// import '../node_modules/primereact/resources/themes/arya-purple/theme.css'

import '../node_modules/primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import "../node_modules/primereact/resources/primereact.min.css"; 
import '../node_modules/primeicons/primeicons.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)
