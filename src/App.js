import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Burger from './components/Burger';
import Menu from './components/Menu';
import Content from './components/Content';
import HomeScreen from './components/HomeScreen';
import About from './components/About';
import Contact from './components/Contact';
import InvoiceGenerator from './components/InvoiceGenerator';
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="container">
        <Burger isOpen={isOpen} toggleSidebar={toggleSidebar} />
        
        <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
          <Menu />
        </div>
        
        <div className={`content ${isOpen ? 'shifted' : ''}`}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/invoice" element={<InvoiceGenerator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
