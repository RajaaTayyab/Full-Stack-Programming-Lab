import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="notfound">
            <div className="notfound-code">404</div>
            <h2>Page Not Found</h2>
            <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                ← Back to Home
            </Link>
        </div>
    );
}

export default NotFound;