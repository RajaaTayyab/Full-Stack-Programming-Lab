import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, UserPlus, FileText, LogOut, Leaf } from 'lucide-react';

export default function Layout({ children }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading]);

  if (loading || !user) return null;

  const navLinks = [
    { href: '/dashboard',     label: 'Dashboard',    icon: LayoutDashboard },
    { href: '/customers',     label: 'Customers',    icon: Users           },
    { href: '/customers/add', label: 'Add Customer', icon: UserPlus        },
    { href: '/invoices',      label: 'Invoices',     icon: FileText        },
  ];

  return (
    <div className="layout-container">
      <aside className="layout-sidebar">

        {/* Brand */}
        <div style={{ paddingLeft: 6, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: 'var(--primary)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Leaf size={15} color="#ffffff" strokeWidth={2.5} />
            </div>
            <span style={{
              fontSize: 15, fontWeight: 800,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}>
              Sage CRM by Tayyab Janjua
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="layout-nav-links">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = router.pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  color:      active ? '#ffffff' : 'var(--text-muted)',
                  background: active ? 'var(--primary)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = 'var(--text)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }
                }}
              >
                <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div style={{
          marginTop: 'auto',
          paddingTop: 16,
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '8px 10px',
            borderRadius: 10,
            marginBottom: 10,
          }}>
            <div style={{
              width: 32, height: 32,
              background: 'var(--primary-soft)',
              border: '1.5px solid var(--primary)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800,
              color: 'var(--primary)',
              flexShrink: 0,
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>● Active</div>
            </div>
          </div>

          <button onClick={logout} className="btn-logout-sidebar" style={{ width: '100%' }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      <main className="layout-main-content">
        {children}
      </main>
    </div>
  );
}
