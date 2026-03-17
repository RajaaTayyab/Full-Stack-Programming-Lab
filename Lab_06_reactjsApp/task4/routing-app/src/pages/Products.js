import React, { useState } from 'react';

const products = [
    { id: 1, emoji: '⌚', tag: 'Accessories', title: 'Smart Watch Pro', desc: 'Track fitness, notifications, and health metrics from your wrist.', price: '$129.99' },
    { id: 2, emoji: '🎧', tag: 'Audio', title: 'Wireless Headphones', desc: 'Premium over-ear audio with 40-hour battery and active noise cancellation.', price: '$89.99' },
    { id: 3, emoji: '💻', tag: 'Tech', title: 'Portable Charger', desc: '20,000mAh power bank with fast charge for all your devices on the go.', price: '$45.99' },
    { id: 4, emoji: '📷', tag: 'Photography', title: 'Mini Tripod Stand', desc: 'Flexible, lightweight tripod compatible with all smartphones and cameras.', price: '$19.99' },
    { id: 5, emoji: '🖱️', tag: 'Peripherals', title: 'Ergonomic Mouse', desc: 'Wireless ergonomic design to reduce wrist fatigue during long sessions.', price: '$39.99' },
    { id: 6, emoji: '🎮', tag: 'Gaming', title: 'Gamepad Controller', desc: 'Universal Bluetooth controller compatible with PC, Android, and iOS.', price: '$59.99' },
    { id: 7, emoji: '💡', tag: 'Smart Home', title: 'LED Smart Bulb', desc: 'Voice-controlled RGB bulb compatible with Alexa and Google Home.', price: '$14.99' },
    { id: 8, emoji: '🎒', tag: 'Lifestyle', title: 'Laptop Backpack', desc: 'Water-resistant 30L backpack with USB charging port and laptop compartment.', price: '$55.99' },
];

function Products() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (id) => {
        setCart((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="page">
            <div className="section-divider"></div>
            <h1 className="section-title">Our Products</h1>
            <p className="section-subtitle">Quality picks for your everyday lifestyle.</p>

            {cart.length > 0 && (
                <div className="cart-banner">
                    🛒 {cart.length} item{cart.length > 1 ? 's' : ''} in your cart
                </div>
            )}

            <div className="products-grid">
                {products.map((p) => (
                    <div className="product-card" key={p.id}>
                        <div className="product-image">{p.emoji}</div>
                        <div className="product-body">
                            <span className="product-tag">{p.tag}</span>
                            <h3 className="product-title">{p.title}</h3>
                            <p className="product-desc">{p.desc}</p>
                            <div className="product-footer">
                                <span className="product-price">{p.price}</span>
                                <button
                                    className={`btn-cart ${cart.includes(p.id) ? 'added' : ''}`}
                                    onClick={() => handleAddToCart(p.id)}
                                >
                                    {cart.includes(p.id) ? '✓ Added' : '+ Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;