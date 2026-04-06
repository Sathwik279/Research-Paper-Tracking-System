import React, { useEffect, useState } from 'react';
import { submissionApi, paperApi, conferenceApi } from '../api';
import { Plus, Send, CheckCircle, Clock, XCircle, Trash2, ExternalLink, Hash, Calendar, FileText, ChevronRight } from 'lucide-react';
import './Dashboard.css';
import './Submissions.css';
import '../styles/Forms.css';

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
    <div className="container py-28 flex flex-col gap-10 animate-enter">
      <header className="page-header">
        <div className="header-content">
          <div className="badge badge-warning w-fit">Live Tracking</div>
          <h1 className="header-title">Submission <span className="text-primary italic">Status</span></h1>
          <p className="header-subtitle">Monitor your papers through the review lifecycle across multiple venues.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary rounded-2xl px-8 py-3 text-lg group">
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          <span>Track Activity</span>
        </button>
      </header>

      {showAdd && (
        <div className="form-container animate-enter">
          <div className="form-header">
            <h3 className="form-title">Log Submission Action</h3>
            <p className="form-subtitle">Link a research paper to a conference venue to track its status.</p>
          </div>
          <form onSubmit={handleSubmit} className="form-grid md:grid-cols-3">
            <div className="form-group">
              <label className="form-label">Research Paper</label>
              <select required className="input-field bg-background font-semibold" value={newSub.paperId} onChange={e => setNewSub({...newSub, paperId: e.target.value})}>
                <option value="">Choose a paper...</option>
                {papers.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Conference Venue</label>
              <select required className="input-field bg-background font-semibold" value={newSub.conferenceId} onChange={e => setNewSub({...newSub, conferenceId: e.target.value})}>
                <option value="">Choose a venue...</option>
                {conferences.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-actions" style={{justifyContent: 'stretch'}}>
              <button type="submit" className="btn btn-primary px-8 rounded-xl h-12 flex-1">Finalize Link</button>
              <button type="button" onClick={() => setShowAdd(false)} className="btn btn-outline px-6 rounded-xl h-12 font-bold">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-6">
          {[1,2,3].map(i => <div key={i} className="card h-28 animate-pulse bg-muted-50 rounded-3xl" />)}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {submissions.map(sub => {
            const config = getStatusConfig(sub.status);
            return (
              <div key={sub.id} className="card submission-card group">
                <div className="submission-info-group">
                  <div className={`status-icon-wrapper ${config.bg} text-primary`}>
                    <config.icon size={28} />
                  </div>
                  <div className="submission-meta">
                    <div className="submission-title-row">
                      <h3 className="submission-title cursor-pointer">{sub.paper?.title}</h3>
                      <div className={`badge ${config.class}`}>{sub.status}</div>
                    </div>
                    <div className="submission-details">
                      <div className="submission-detail-item">
                        <Hash size={14} className="text-primary" /> Venue: {sub.conference?.name}
                      </div>
                      <div className="submission-detail-item">
                        <Calendar size={14} /> Submitted: {sub.submissionDate || 'Pending'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submission-actions">
                  <a href={sub.conference?.url} target="_blank" rel="noopener noreferrer" className="action-btn-circle">
                    <ExternalLink size={20} />
                  </a>
                  <button onClick={() => { if(window.confirm('Stop tracking this submission?')) submissionApi.delete(sub.id).then(fetchData); }} className="action-btn-circle delete">
                    <Trash2 size={20} />
                  </button>
                  <ChevronRight size={24} className="chevron-indicator" />
                </div>
              </div>
            );
          })}
          {submissions.length === 0 && !showAdd && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <FileText size={80} strokeWidth={1} />
              </div>
              <div className="empty-state-text">
                <h3 className="empty-state-title">No active submissions</h3>
                <p className="empty-state-description">Bridge the gap between your research manuscripts and conference venues.</p>
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
