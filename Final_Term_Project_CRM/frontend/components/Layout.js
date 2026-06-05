import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading]);

  if (loading || !user) return null;

  const navLinks = [
    { href: '/dashboard',   label: '🌿 Dashboard' },
    { href: '/customers',   label: '👥 Customers' },
    { href: '/customers/add', label: '➕ Add Customer' },
    { href: '/invoices',    label: '🧾 Invoices' },
  ];

  return (
    <div className="layout-container">
      {/* Sidebar Navigation Panel Component */}
      <aside className="layout-sidebar">
        {/* Brand Header Customization */}
        <div style={{ marginBottom: 32, paddingLeft: 8 }}>
          <div style={{ 
            fontSize: 20, 
            fontWeight: 700, 
            color: 'var(--primary)',
            letterSpacing: '-0.02em'
          }}>
            Nexum CRM
          </div>
          <div style={{ 
            fontSize: 11, 
            color: 'var(--text-muted)', 
            marginTop: 2,
            fontWeight: 500
          }}>
            by Tayyab Janjua
          </div>
          <div style={{ 
            fontSize: 12, 
            color: 'var(--text-light)', 
            marginTop: 12, 
            paddingTop: 12, 
            borderTop: '1px dashed var(--border)' 
          }}>
            Welcome, {user.name}
          </div>
        </div>
        
        {/* Dynamic Navigation Link Stack */}
        <div className="layout-nav-links">
          {navLinks.map(l => {
            const isActive = router.pathname === l.href;
            return (
              <Link key={l.href} href={l.href} style={{
                padding: '10px 12px', 
                borderRadius: 'var(--radius)', 
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                background: isActive ? 'var(--primary-soft)' : 'transparent',
                fontSize: 14, 
                fontWeight: isActive ? 600 : 500,
                transition: 'background 0.2s, color 0.2s', 
                display: 'block'
              }}>
                {l.label}
              </Link>
            );
          })}
        </div>
        
        <button onClick={logout} className="btn-logout-sidebar">
          🚪 Logout
        </button>
      </aside>
      
      {/* Main Content Workspace Frame */}
      <main className="layout-main-content">
        {children}
      </main>
    </div>
  );
}