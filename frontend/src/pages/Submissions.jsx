import React, { useEffect, useState } from 'react';
import { submissionApi, paperApi, conferenceApi } from '../api';
import { Plus, Send, CheckCircle, Clock, XCircle, Trash2, ExternalLink, Hash, Calendar, FileText, ChevronRight } from 'lucide-react';

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [papers, setPapers] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newSub, setNewSub] = useState({ paperId: '', conferenceId: '', status: 'DRAFT' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subRes, paperRes, confRes] = await Promise.all([
        submissionApi.getMySubmissions(),
        paperApi.getMyPapers(),
        conferenceApi.getAll()
      ]);
      setSubmissions(subRes.data);
      setPapers(paperRes.data);
      setConferences(confRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const paper = papers.find(p => p.id === parseInt(newSub.paperId));
    const conference = conferences.find(c => c.id === parseInt(newSub.conferenceId));
    
    submissionApi.create({
      paper,
      conference,
      status: newSub.status,
      submissionDate: new Date().toISOString().split('T')[0]
    })
    .then(() => {
      setShowAdd(false);
      setNewSub({ paperId: '', conferenceId: '', status: 'DRAFT' });
      fetchData();
    })
    .catch(err => console.error(err));
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'ACCEPTED': return { icon: CheckCircle, class: 'badge-success', bg: 'bg-green-500/10' };
      case 'REJECTED': return { icon: XCircle, class: 'badge-danger', bg: 'bg-red-500/10' };
      case 'SUBMITTED': case 'UNDER_REVIEW': return { icon: Clock, class: 'badge-warning', bg: 'bg-orange-500/10' };
      default: return { icon: Send, class: 'badge-primary', bg: 'bg-primary/10' };
    }
  };

  return (
    <div className="container mx-auto px-6 py-28 flex flex-col gap-10 animate-enter">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="badge badge-warning w-fit">Live Tracking</div>
          <h1 className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">Submission <span className="text-primary italic">Status</span></h1>
          <p className="text-muted-foreground text-xl max-w-2xl font-medium">Monitor your papers through the review lifecycle across multiple venues.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary rounded-2xl px-8 py-3 text-lg group">
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          <span>Track Activity</span>
        </button>
      </header>

      {showAdd && (
        <div className="glass p-8 rounded-3xl border-primary/20 animate-enter flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col gap-x-1">
            <h3 className="text-2xl font-bold">Log Submission Action</h3>
            <p className="text-sm text-muted-foreground font-medium">Link a research paper to a conference venue to track its status.</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Research Paper</label>
              <select required className="input-field bg-background font-semibold" value={newSub.paperId} onChange={e => setNewSub({...newSub, paperId: e.target.value})}>
                <option value="">Choose a paper...</option>
                {papers.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Conference Venue</label>
              <select required className="input-field bg-background font-semibold" value={newSub.conferenceId} onChange={e => setNewSub({...newSub, conferenceId: e.target.value})}>
                <option value="">Choose a venue...</option>
                {conferences.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" className="btn btn-primary px-8 rounded-xl h-12 flex-1">Finalize Link</button>
              <button type="button" onClick={() => setShowAdd(false)} className="btn btn-outline px-6 rounded-xl h-12 font-bold">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-6">
          {[1,2,3].map(i => <div key={i} className="card h-28 animate-pulse bg-muted/50 rounded-3xl" />)}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {submissions.map(sub => {
            const config = getStatusConfig(sub.status);
            return (
              <div key={sub.id} className="card group flex flex-col md:flex-row md:items-center justify-between p-6 hover:border-primary/30 relative py-8">
                <div className="flex items-start md:items-center gap-6">
                  <div className={`p-5 rounded-2xl ${config.bg} text-primary shadow-sm border border-primary/5`}>
                    <config.icon size={28} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-extrabold tracking-tight group-hover:text-primary transition-colors cursor-pointer">{sub.paper?.title}</h3>
                      <div className={`badge ${config.class}`}>{sub.status}</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-5 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                      <div className="flex items-center gap-1.5"><Hash size={14} className="text-primary" /> Venue: {sub.conference?.name}</div>
                      <div className="flex items-center gap-1.5"><Calendar size={14} /> Submitted: {sub.submissionDate || 'Pending'}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-6 md:mt-0 border-t md:border-t-0 p-4 md:p-0">
                  <a href={sub.conference?.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline p-3 rounded-xl hover:text-primary hover:border-primary">
                    <ExternalLink size={20} />
                  </a>
                  <button onClick={() => { if(window.confirm('Stop tracking this submission?')) submissionApi.delete(sub.id).then(fetchData); }} className="btn btn-outline p-3 rounded-xl hover:text-red-500 hover:border-red-200">
                    <Trash2 size={20} />
                  </button>
                  <ChevronRight size={24} className="text-muted-foreground group-hover:translate-x-1 transition-transform ml-2 hidden lg:block" />
                </div>
              </div>
            );
          })}
          {submissions.length === 0 && !showAdd && (
            <div className="py-40 flex flex-col items-center justify-center gap-8 glass rounded-3xl border-dashed border-2 border-border border-white/20">
              <div className="flex items-center gap-4">
                 <div className="p-8 bg-muted/40 rounded-full text-muted-foreground/30 relative">
                  <FileText size={80} strokeWidth={1} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full p-4 animate-pulse">
                    <Send size={40} className="text-primary/40" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">No active submissions</h3>
                <p className="text-muted-foreground text-lg font-medium max-w-sm mx-auto mt-2">Bridge the gap between your research manuscripts and conference venues.</p>
              </div>
              <button onClick={() => setShowAdd(true)} className="btn btn-primary px-12 rounded-full text-lg mt-4 shadow-xl">Track Submission Activity</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Submissions;
