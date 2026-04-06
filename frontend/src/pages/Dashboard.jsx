import React, { useEffect, useState } from 'react';
import { conferenceApi } from '../api';
import ConferenceCard from '../components/ConferenceCard';
import { Plus, Search, Filter, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import '../styles/Layout.css';

const Dashboard = () => {
  const [conferences, setConferences] = useState([]);
  const [filteredConferences, setFilteredConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    conferenceApi.getAll()
      .then(res => {
        setConferences(res.data);
        setFilteredConferences(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = conferences.filter(conf => 
      conf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (conf.ranking && conf.ranking.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredConferences(results);
  }, [searchTerm, conferences]);

  return (
    <div className="container py-28 flex flex-col gap-10 animate-enter">
      <header className="page-header">
        <div className="header-content">
          <div className="badge badge-primary w-fit">Conference Directory</div>
          <h1 className="header-title">
            Explore <span className="text-primary italic">Conferences</span>
          </h1>
          <p className="header-subtitle">
            Monitor deadlines, policies, and rankings in one centralized researcher-first dashboard.
          </p>
        </div>
        <Link to="/add-conference" className="btn btn-primary rounded-2xl px-8 py-3 text-lg group no-underline">
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          <span>Track New</span>
        </Link>
      </header>

      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search size={22} className="text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, ranking, or tier..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="filter-button">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="card h-80 animate-pulse bg-muted-50 rounded-3xl" />)}
        </div>
      ) : filteredConferences.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConferences.map(conf => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <XCircle size={64} strokeWidth={1.5} />
          </div>
          <div className="empty-state-text">
            <h3 className="empty-state-title">No results found</h3>
            <p className="empty-state-description">We couldn't find any conferences matching "{searchTerm}"</p>
          </div>
          <button 
            onClick={() => setSearchTerm('')}
            className="btn btn-outline px-8 rounded-full"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
