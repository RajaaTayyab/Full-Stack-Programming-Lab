import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <span className="brand-dot"></span>
                    ShopLite
                </Link>
                <ul className="navbar-links">
                    <li><Link to="/" className={isActive('/')}>Home</Link></li>
                    <li><Link to="/about" className={isActive('/about')}>About</Link></li>
                    <li><Link to="/products" className={isActive('/products')}>Products</Link></li>
                    <li><Link to="/contact" className={isActive('/contact')}>Contact Us</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;