import React from 'react';

function About() {
    const stats = [
        { number: '12K+', label: 'Happy Customers' },
        { number: '850+', label: 'Products Listed' },
        { number: '98%', label: 'Satisfaction Rate' },
        { number: '5★', label: 'Average Rating' },
    ];

    return (
        <div className="page">
            <div className="section-divider"></div>
            <h1 className="section-title">About ShopLite</h1>
            <p className="section-subtitle">The story behind our mission.</p>

            <div className="about-layout">
                <div className="about-text">
                    <p>
                        ShopLite was founded in 2022 with a simple belief: online shopping should be fast,
                        clean, and enjoyable — not overwhelming. We set out to build a store that puts
                        customers first and clutter last.
                    </p>
                    <p>
                        We partner with trusted suppliers and independent creators to bring you a carefully
                        curated selection of everyday essentials and unique finds. Whether you're shopping
                        for tech, lifestyle, or home goods, ShopLite has something for everyone.
                    </p>
                    <p>
                        Our team is passionate about design, quality, and service. Every product is reviewed
                        before it hits our shelves, and every order is packed with care. We're more than a
                        store — we're a community built around thoughtful consumption.
                    </p>
                </div>

                <div className="stat-grid">
                    {stats.map((s, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-number">{s.number}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;