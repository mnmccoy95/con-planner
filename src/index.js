import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import { ConPlanner } from "./components/ConPlan"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ConPlanner />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

