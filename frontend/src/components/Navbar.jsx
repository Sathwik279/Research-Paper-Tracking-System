import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Calendar, FileText, Send, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none">
      <nav className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg pointer-events-auto border-white/40">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-primary">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <Layout size={20} />
          </div>
          <span>ConfTrack</span>
        </Link>
        
        <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-xl">
          {[
            { path: '/', icon: Calendar, label: 'Conferences' },
            { path: '/papers', icon: FileText, label: 'Papers' },
            { path: '/submissions', icon: Send, label: 'Submissions' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-white shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
              }`}
            >
              <item.icon size={18} />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-xs font-bold text-foreground">Sathwik</span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Researcher</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-md border-2 border-white">
            <User size={20} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
