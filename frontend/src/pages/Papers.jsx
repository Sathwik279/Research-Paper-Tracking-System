import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash2, FileText, User, ChevronRight } from 'lucide-react';
import { paperApi } from '../api';
import './Dashboard.css'; // For common empty states or shared layout
import './Papers.css';
import '../styles/Forms.css';
import '../styles/Layout.css';

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newPaper, setNewPaper] = useState({ title: '', abstractContent: '', authors: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPapers = () => {
    setLoading(true);
    paperApi.getMyPapers()
      .then(res => {
        setPapers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    paperApi.create(newPaper)
      .then(() => {
        setShowAdd(false);
        setNewPaper({ title: '', abstractContent: '', authors: '' });
        fetchPapers();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this manuscript?')) {
      paperApi.delete(id).then(fetchPapers);
    }
  };

  const filteredPapers = papers.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.authors.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-28 flex flex-col gap-10 animate-enter">
      <header className="page-header">
        <div className="header-content">
          <div className="badge badge-success w-fit">My Manuscripts</div>
          <h1 className="header-title">Research <span className="text-primary italic">Papers</span></h1>
          <p className="header-subtitle">Manage your active research projects and submission versions.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary rounded-2xl px-8 py-3 text-lg group">
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          <span>New Project</span>
        </button>
      </header>

      {showAdd && (
        <div className="form-container animate-enter">
          <div className="form-header">
            <h3 className="form-title">Register New Manuscript</h3>
            <p className="form-subtitle">Enter the core details of your research work.</p>
          </div>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group md:col-span-2">
              <label className="form-label">Paper Title</label>
              <input required placeholder="E.g., Quantum-enhanced neural networks for edge computing" className="input-field text-lg font-semibold" value={newPaper.title} onChange={e => setNewPaper({...newPaper, title: e.target.value})} />
            </div>
            <div className="form-group md:col-span-2">
              <label className="form-label">Abstract Highlights</label>
              <textarea placeholder="Summarize the core methodology and results..." className="input-field h-32 resize-none" value={newPaper.abstractContent} onChange={e => setNewPaper({...newPaper, abstractContent: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Authors</label>
              <input placeholder="Comma separated list" className="input-field" value={newPaper.authors} onChange={e => setNewPaper({...newPaper, authors: e.target.value})} />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setShowAdd(false)} className="btn btn-outline px-8 rounded-2xl font-bold">Discard</button>
              <button type="submit" className="btn btn-primary px-10 rounded-2xl">Create Manuscript</button>
            </div>
          </form>
        </div>
      )}

      {!showAdd && (
        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <Search size={22} className="text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter your papers..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="paper-grid">
          {[1,2,3,4].map(i => <div key={i} className="card h-48 animate-pulse bg-muted-50 rounded-3xl" />)}
        </div>
      ) : (
        <div className="paper-grid">
          {filteredPapers.map(paper => (
            <div key={paper.id} className="card paper-card group">
              <div className="paper-card-delete">
                 <button onClick={() => handleDelete(paper.id)} className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all rounded-xl">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="paper-header">
                <div className="paper-title-row">
                  <div className="paper-icon">
                    <FileText size={24} />
                  </div>
                  <div className="flex-col gap-1">
                    <h3 className="paper-title cursor-pointer">{paper.title}</h3>
                    <div className="paper-authors">
                      <User size={14} />
                      <span>{paper.authors || 'Lead Researcher'}</span>
                    </div>
                  </div>
                </div>
                <p className="paper-abstract">{paper.abstractContent || 'No abstract defined for this project.'}</p>
              </div>
              <div className="paper-footer">
                <div className="paper-status-badge">
                   Status: Active
                </div>
                <button className="view-detail-btn">
                  View Detail <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
          {filteredPapers.length === 0 && !showAdd && (
            <div className="empty-state" style={{gridColumn: '1 / -1'}}>
              <div className="empty-state-icon">
                <FileText size={80} strokeWidth={1} />
              </div>
              <div className="empty-state-text">
                <h3 className="empty-state-title">No papers found</h3>
                <p className="empty-state-description">Start your research journey by logging your first paper project.</p>
              </div>
              <button onClick={() => setShowAdd(true)} className="btn btn-primary px-10 rounded-full text-lg mt-4 shadow-xl">Add Your First Paper</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Papers;
