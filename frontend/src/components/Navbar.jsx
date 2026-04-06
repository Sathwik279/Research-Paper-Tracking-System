import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Calendar, FileText, Send, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-content">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <Layout size={20} />
          </div>
          <span>ConfTrack</span>
        </Link>
        
        <div className="navbar-links-container">
          {[
            { path: '/', icon: Calendar, label: 'Conferences' },
            { path: '/papers', icon: FileText, label: 'Papers' },
            { path: '/submissions', icon: Send, label: 'Submissions' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span className="navbar-link-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="navbar-user-section">
          <div className="user-info">
            <span className="user-name">Sathwik</span>
            <span className="user-role">Researcher</span>
          </div>
          <div className="user-avatar">
            <User size={20} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
