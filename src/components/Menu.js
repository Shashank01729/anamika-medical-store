// src/components/Menu.js
// import React from 'react';
// import './Menu.css'; // Import the CSS file

// function Menu({ onPageChange }) {
//   return (
//     <nav>
//       <a href="#home" onClick={() => onPageChange('home')}>Home</a>
//       <a href="#about" onClick={() => onPageChange('about')}>About</a>
//       <a href="#contact" onClick={() => onPageChange('contact')}>Contact</a>
//       <a href="#invoice" onClick={() => onPageChange('invoice')}>Invoice Generator</a> {/* New link added */}
//     </nav>
//   );
// }

// export default Menu;


import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/invoice">Invoice Generator</Link>
    </nav>
  );
}

export default Menu;
