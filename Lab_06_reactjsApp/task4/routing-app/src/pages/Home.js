import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const features = [
        { icon: '🛍️', title: 'Curated Products', desc: 'Hand-picked items across categories with quality guaranteed.' },
        { icon: '🚀', title: 'Fast Delivery', desc: 'Express shipping to your doorstep within 2–3 business days.' },
        { icon: '🔒', title: 'Secure Payments', desc: 'Your transactions are protected with end-to-end encryption.' },
        { icon: '💬', title: '24/7 Support', desc: 'Our support team is always here to help you, anytime.' },
    ];

    return (
        <div className="page">
            <section className="hero">
                <div className="hero-badge">✦ Welcome to ShopLite</div>
                <h1>Your Everyday Store,<br />Reimagined.</h1>
                <p>Discover a clean, simple shopping experience. Browse top products, great deals, and everything you need — all in one place.</p>
                <Link to="/products" className="hero-btn">Browse Products →</Link>
            </section>

            <div>
                <div className="section-divider"></div>
                <h2 className="section-title">Why ShopLite?</h2>
                <p className="section-subtitle">Built around what matters most to our customers.</p>
                <div className="cards-grid">
                    {features.map((f, i) => (
                        <div className="card" key={i}>
                            <div className="card-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;