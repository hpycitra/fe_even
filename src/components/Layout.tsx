import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  LayoutDashboard, Calendar, Tags, Mic2, User, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/categories', icon: Tags, label: 'Kategori' },
  { to: '/pembicara', icon: Mic2, label: 'Pembicara' },
  { to: '/biodata', icon: User, label: 'Biodata' },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --grad-bg: linear-gradient(135deg, #0f0c29 0%, #1a1060 50%, #24243e 100%);
          --grad-sidebar: linear-gradient(180deg, #1e1250 0%, #0f0c29 100%);
          --grad-active: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --grad-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --grad-card: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
          --grad-topbar: linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          --grad-hover: linear-gradient(135deg, rgba(240,147,251,0.15) 0%, rgba(245,87,108,0.15) 100%);
          --grad-avatar: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          --grad-badge: linear-gradient(135deg, rgba(79,172,254,0.2) 0%, rgba(0,242,254,0.2) 100%);
          --text: #f0eeff;
          --text-muted: #8b7ec8;
          --border: rgba(255,255,255,0.08);
          --border-glow: rgba(240,147,251,0.3);
          --radius: 18px;
          --radius-sm: 12px;
        }

        body {
          background: var(--grad-bg);
          color: var(--text);
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100dvh;
        }

        /* ── Layout Shell ── */
        .bento-shell {
          display: grid;
          min-height: 100dvh;
          grid-template-columns: 72px 1fr;
          grid-template-rows: 1fr;
          gap: 12px;
          padding: 12px;
          background: linear-gradient(135deg, #0f0c29 0%, #1a1060 50%, #24243e 100%);
        }

        /* ── Sidebar ── */
        .bento-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: linear-gradient(180deg, rgba(30,18,80,0.95) 0%, rgba(15,12,41,0.95) 100%);
          border: 1px solid rgba(240,147,251,0.15);
          border-radius: var(--radius);
          padding: 14px 0;
          position: sticky;
          top: 12px;
          height: calc(100dvh - 24px);
          overflow: hidden;
          z-index: 10;
          transition: width 0.3s cubic-bezier(.4,0,.2,1);
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(240,147,251,0.1), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .bento-sidebar.open {
          width: 220px;
          padding: 14px 12px;
          align-items: flex-start;
        }

        /* ── Logo block ── */
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: var(--radius-sm);
          color: #fff;
          margin-bottom: 10px;
          width: 44px;
          overflow: hidden;
          transition: width 0.3s;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(240,147,251,0.4);
        }

        .bento-sidebar.open .sidebar-logo {
          width: 100%;
        }

        .sidebar-logo span {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: -0.3px;
          opacity: 0;
          transition: opacity 0.2s;
          color: #fff;
        }

        .bento-sidebar.open .sidebar-logo span {
          opacity: 1;
        }

        /* ── Nav items ── */
        .bento-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          flex: 1;
        }

        .bento-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.2px;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s;
          white-space: nowrap;
          overflow: hidden;
          width: 44px;
          position: relative;
        }

        .bento-sidebar.open .bento-nav-item {
          width: 100%;
        }

        .bento-nav-item:hover {
          background: linear-gradient(135deg, rgba(240,147,251,0.15) 0%, rgba(245,87,108,0.15) 100%);
          color: #f093fb;
        }

        .bento-nav-item.active {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: #fff;
          box-shadow: 0 4px 16px rgba(240,147,251,0.4);
        }

        .bento-nav-item span {
          opacity: 0;
          transition: opacity 0.15s;
        }

        .bento-sidebar.open .bento-nav-item span {
          opacity: 1;
        }

        /* ── User + Logout ── */
        .sidebar-footer {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .user-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          color: #0a2e1f;
          font-size: 12px;
          font-weight: 800;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(67,233,123,0.4);
        }

        .user-details {
          opacity: 0;
          transition: opacity 0.15s;
          overflow: hidden;
        }

        .bento-sidebar.open .user-details {
          opacity: 1;
        }

        .user-name {
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 130px;
          color: var(--text);
        }

        .user-nim {
          font-size: 11px;
          color: var(--text-muted);
          font-family: 'DM Mono', monospace;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          width: 100%;
          border-radius: var(--radius-sm);
          background: transparent;
          border: 1px solid rgba(245,87,108,0.25);
          color: var(--text-muted);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s, box-shadow 0.18s;
          white-space: nowrap;
          overflow: hidden;
        }

        .logout-btn:hover {
          background: linear-gradient(135deg, rgba(245,87,108,0.15) 0%, rgba(240,147,251,0.1) 100%);
          border-color: rgba(245,87,108,0.6);
          color: #f5576c;
          box-shadow: 0 2px 12px rgba(245,87,108,0.2);
        }

        .logout-btn span {
          opacity: 0;
          transition: opacity 0.15s;
        }

        .bento-sidebar.open .logout-btn span {
          opacity: 1;
        }

        /* ── Main area ── */
        .bento-main {
          display: grid;
          grid-template-rows: auto 1fr;
          gap: 12px;
          min-height: 0;
        }

        /* ── Topbar ── */
        .bento-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(240,147,251,0.12);
          border-radius: var(--radius);
          padding: 12px 20px;
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: var(--text);
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, color 0.18s, box-shadow 0.18s;
        }

        .menu-toggle:hover {
          background: linear-gradient(135deg, rgba(240,147,251,0.2) 0%, rgba(79,172,254,0.2) 100%);
          border-color: rgba(240,147,251,0.4);
          color: #f093fb;
          box-shadow: 0 2px 12px rgba(240,147,251,0.2);
        }

        .topbar-title {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.3px;
          background: linear-gradient(135deg, #f093fb 0%, #4facfe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .welcome-badge {
          font-size: 12px;
          font-family: 'DM Mono', monospace;
          color: rgba(240,238,255,0.6);
          background: linear-gradient(135deg, rgba(79,172,254,0.15) 0%, rgba(0,242,254,0.1) 100%);
          border: 1px solid rgba(79,172,254,0.2);
          padding: 6px 14px;
          border-radius: 999px;
          letter-spacing: 0.2px;
        }

        .welcome-badge strong {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        /* ── Page content card ── */
        .bento-content {
          background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(240,147,251,0.1);
          border-radius: var(--radius);
          padding: 24px;
          overflow-y: auto;
          min-height: 0;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* ── Mobile overlay ── */
        .overlay {
          display: none;
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .bento-shell {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            padding: 8px;
            gap: 8px;
          }

          .bento-sidebar {
            position: fixed;
            left: -240px;
            top: 0;
            height: 100dvh;
            width: 220px !important;
            border-radius: 0 var(--radius) var(--radius) 0;
            transition: left 0.3s cubic-bezier(.4,0,.2,1);
            padding: 14px 12px !important;
            align-items: flex-start !important;
          }

          .bento-sidebar.open {
            left: 0;
            width: 220px;
          }

          .bento-sidebar .sidebar-logo { width: 100% !important; }
          .bento-sidebar .sidebar-logo span,
          .bento-sidebar .bento-nav-item span,
          .bento-sidebar .user-details,
          .bento-sidebar .logout-btn span {
            opacity: 1 !important;
          }
          .bento-sidebar .bento-nav-item { width: 100% !important; }

          .overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(15,12,41,0.7);
            backdrop-filter: blur(4px);
            z-index: 9;
          }

          .bento-topbar { border-radius: var(--radius); }
          .bento-main { min-height: 0; }
        }
      `}</style>

      <div className="bento-shell">
        {sidebarOpen && (
          <div className="overlay" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`bento-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-logo">
            <Calendar size={20} />
            <span>NexaEvent</span>
          </div>

          <nav className="bento-nav">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `bento-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-chip">
              <div className="avatar">{user?.name?.charAt(0)}</div>
              <div className="user-details">
                <p className="user-name">{user?.name}</p>
                <p className="user-nim">{user?.nim}</p>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={14} />
              <span>Keluar</span>
            </button>
          </div>
        </aside>

        <div className="bento-main">
          <header className="bento-topbar">
            <div className="topbar-left">
              <button
                className="menu-toggle"
                onClick={() => setSidebarOpen(v => !v)}
              >
                {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
              <span className="topbar-title">NexaEvent</span>
            </div>
            <div className="topbar-right">
              <span className="welcome-badge">
                Halo, <strong>{user?.name}</strong>
              </span>
            </div>
          </header>

          <div className="bento-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;