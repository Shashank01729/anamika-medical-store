import React from 'react';
import './HomeScreen.css';

const HomeScreen = () => {
    const products = [
        { id: 1, name: 'Pain Reliever', description: 'Fast relief from headaches and pain.', price: '₹800', image: 'products/product1.jpg' },
        { id: 2, name: 'Covid Vaccine', description: 'Soothes throat and relieves cough.', price: '₹600', image: 'products/product2.jpg' },
        { id: 3, name: 'Contra Tabs', description: 'Helps in healing cuts and scrapes.', price: '₹900', image: 'products/product3.jpg' },
        { id: 4, name: 'Vitamins', description: 'Boosts your immune system.', price: '₹1200', image: 'products/product4.jpg' },
        { id: 5, name: 'Pain Reliever', description: 'Relieves symptoms of common cold.', price: '₹700', image: 'products/product5.jpg' },
        { id: 6, name: 'Eye Drop', description: 'Provides relief from acid indigestion.', price: '₹500', image: 'products/product6.jpg' },
        { id: 7, name: 'Allergy Relief', description: 'Helps alleviate allergy symptoms.', price: '₹850', image: 'products/product7.jpg' },
        { id: 8, name: 'Hand Sanitizer', description: 'Kills 99.9% of the germs from your hands.', price: '₹250', image: 'products/product8.jpg' },
    ];

    return (
        <div>
            <header className="hero-section">
                <h1>Welcome to Anamika Medical Store</h1>
                <p>Your health is our priority!</p>
                <button className="cta-button">Shop Now</button>
            </header>

            <div className="product-cards">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <span className="price">{product.price}</span>
                        <button className="buy-button">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
