import React, { useEffect, useState } from 'react';
import { paperApi } from '../api';
import { Plus, FileText, Trash2, User, ChevronRight, Search } from 'lucide-react';

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
    <div className="container mx-auto px-6 py-28 flex flex-col gap-10 animate-enter">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="badge badge-success w-fit">My Manuscripts</div>
          <h1 className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">Research <span className="text-primary italic">Papers</span></h1>
          <p className="text-muted-foreground text-xl max-w-2xl font-medium">Manage your active research projects and submission versions.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary rounded-2xl px-8 py-3 text-lg group">
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          <span>New Project</span>
        </button>
      </header>

      {showAdd && (
        <div className="glass p-8 rounded-3xl border-primary/20 animate-enter flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">Register New Manuscript</h3>
            <p className="text-sm text-muted-foreground font-medium">Enter the core details of your research work.</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Paper Title</label>
              <input required placeholder="E.g., Quantum-enhanced neural networks for edge computing" className="input-field text-lg font-semibold" value={newPaper.title} onChange={e => setNewPaper({...newPaper, title: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Abstract Highlights</label>
              <textarea placeholder="Summarize the core methodology and results..." className="input-field h-32 resize-none" value={newPaper.abstractContent} onChange={e => setNewPaper({...newPaper, abstractContent: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Authors</label>
              <input placeholder="Comma separated list" className="input-field" value={newPaper.authors} onChange={e => setNewPaper({...newPaper, authors: e.target.value})} />
            </div>
            <div className="flex items-end justify-end gap-3">
              <button type="button" onClick={() => setShowAdd(false)} className="btn btn-outline px-8 rounded-2xl font-bold">Discard</button>
              <button type="submit" className="btn btn-primary px-10 rounded-2xl">Create Manuscript</button>
            </div>
          </form>
        </div>
      )}

      {!showAdd && (
        <div className="flex flex-wrap items-center justify-between gap-6 p-4 glass rounded-3xl border-white/20 shadow-sm mb-6">
          <div className="flex items-center gap-3 bg-muted/30 px-6 py-3 rounded-2xl border border-border w-full max-w-xl transition-all focus-within:border-primary/50">
            <Search size={22} className="text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter your papers..." 
              className="bg-transparent border-none outline-none w-full text-base font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="card h-48 animate-pulse bg-muted/50 rounded-3xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPapers.map(paper => (
            <div key={paper.id} className="card flex flex-col gap-6 group hover:border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => handleDelete(paper.id)} className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all rounded-xl">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-4 rounded-2xl text-primary border border-primary/10">
                    <FileText size={24} />
                  </div>
                  <div className="flex flex-col gap-1 pr-10">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">{paper.title}</h3>
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <User size={14} />
                      <span>{paper.authors || 'Lead Researcher'}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed font-medium">{paper.abstractContent || 'No abstract defined for this project.'}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-3 py-1 rounded-full">
                   Status: Active
                </div>
                <button className="flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                  View Detail <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
          {filteredPapers.length === 0 && !showAdd && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center gap-6 glass rounded-3xl border-dashed border-2 border-border border-white/20">
              <div className="p-8 bg-muted/40 rounded-full text-muted-foreground/30">
                <FileText size={80} strokeWidth={1} />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">No papers found</h3>
                <p className="text-muted-foreground text-lg font-medium max-w-sm mx-auto mt-2">Start your research journey by logging your first paper project.</p>
              </div>
              <button onClick={() => setShowAdd(true)} className="btn btn-primary px-10 rounded-full text-lg mt-4">Add Your First Paper</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Papers;
