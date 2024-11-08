// src/components/Content.js
import React from 'react';
import './Content.css'; // Optional: Create a CSS file for styles
import InvoiceGenerator from './InvoiceGenerator'; // Import the new InvoiceGenerator component
import HomeScreen from './HomeScreen';
import Contact from './Contact';
import About from './About';

function Content({ page }) {
  return (
    <div>
      {page === 'home' && (
        <div className="home-container">
          <HomeScreen />
        </div>
      )}
      {page === 'about' && (
        <>
          <About />
        </>
      )}
      {page === 'contact' && (
        <>
          <Contact />
        </>
      )}
      {page === 'invoice' && (
        <InvoiceGenerator /> // Include the Invoice Generator component here
      )}
    </div>
  );
}

export default Content;
