import React, { useEffect, useState } from 'react';
import { conferenceApi } from '../api';
import ConferenceCard from '../components/ConferenceCard';
import { Plus, Search, Filter, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="container mx-auto px-6 py-28 flex flex-col gap-10 animate-enter">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="badge badge-primary w-fit">Conference Directory</div>
          <h1 className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            Explore <span className="text-primary italic">Conferences</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl font-medium">
            Monitor deadlines, policies, and rankings in one centralized researcher-first dashboard.
          </p>
        </div>
        <Link to="/add-conference" className="btn btn-primary rounded-2xl px-8 py-3 text-lg group no-underline">
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          <span>Track New</span>
        </Link>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-6 p-4 glass rounded-3xl border-white/20 shadow-sm">
        <div className="flex items-center gap-3 bg-muted/30 px-6 py-3 rounded-2xl border border-border w-full max-w-xl transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
          <Search size={22} className="text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, ranking, or tier..." 
            className="bg-transparent border-none outline-none w-full text-base font-medium placeholder:text-muted-foreground/60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-border hover:bg-muted transition-all text-sm font-bold uppercase tracking-wider">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="card h-80 animate-pulse bg-muted/50 rounded-3xl" />)}
        </div>
      ) : filteredConferences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConferences.map(conf => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 py-24 glass rounded-3xl border-dashed border-2 border-border animate-enter">
          <div className="p-6 bg-muted/40 rounded-full text-muted-foreground">
            <XCircle size={64} strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">No results found</h3>
            <p className="text-muted-foreground font-medium mt-1">We couldn't find any conferences matching "{searchTerm}"</p>
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
