import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';


const NavigationBar = (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/creditcardform">Submit a Form</Link>
        </li>
        <li className="nav-item">
          <Link to="/creditcardform/getUID">View Submitted Form</Link>
        </li>
      </ul>
    </nav>
)

export default NavigationBar;