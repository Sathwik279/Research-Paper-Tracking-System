import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { conferenceApi } from '../api';
import { ArrowLeft, Globe, Calendar, Bot, AlertTriangle, FileText, Info } from 'lucide-react';
import './AddConference.css';
import '../styles/Forms.css';

const AddConference = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    ranking: '',
    submissionDeadline: '',
    notificationDate: '',
    aiPolicy: '',
    plagiarismPolicy: '',
    fees: '',
    pageLimit: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    conferenceApi.create({
      ...formData,
      pageLimit: formData.pageLimit ? parseInt(formData.pageLimit) : null
    })
    .then(() => navigate('/'))
    .catch(err => console.error(err));
  };

  return (
    <div className="container py-28 max-w-5xl animate-enter">
      <button onClick={() => navigate('/')} className="back-button">
        <ArrowLeft size={18} />
        <span>Back to Directory</span>
      </button>

      <form onSubmit={handleSubmit} className="form-container">
        <header className="form-header">
          <div className="badge badge-primary w-fit">Registry</div>
          <h2 className="form-title">Register <span className="text-primary">Venue</span></h2>
          <p className="form-subtitle text-lg">Log a conference venue to your personalized tracker to monitor its specific constraints and deadlines.</p>
        </header>

        <div className="form-grid">
          <div className="form-group md:col-span-2">
            <label className="form-label form-label-with-icon">
              <Globe size={14} className="text-primary" /> Conference Name
            </label>
            <input required placeholder="E.g., International Conference on Machine Learning (ICML)" className="input-field text-lg font-semibold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Website URL</label>
            <input type="url" placeholder="https://conference-site.org" className="input-field" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
          </div>

          <div className="form-group">
            <label className="form-label">Ranking / Tier</label>
            <input placeholder="E.g., CORE A*, Q1, Top-tier" className="input-field" value={formData.ranking} onChange={e => setFormData({...formData, ranking: e.target.value})} />
          </div>

          <div className="form-section-divider md:col-span-2">
            <h4 className="form-section-title">
              <Calendar size={18} className="form-section-icon" /> Critical Timelines
            </h4>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Submission Deadline</label>
                <input type="date" className="input-field" value={formData.submissionDeadline} onChange={e => setFormData({...formData, submissionDeadline: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Notification Date</label>
                <input type="date" className="input-field" value={formData.notificationDate} onChange={e => setFormData({...formData, notificationDate: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="form-section-divider md:col-span-2">
            <h4 className="form-section-title">
              <Info size={18} className="form-section-icon" /> Constraints & Policies
            </h4>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label form-label-with-icon">
                  <Bot size={14} className="text-primary" /> AI Policy
                </label>
                <textarea placeholder="Specify rules regarding LLM and AI tool usage..." className="input-field h-24 resize-none" value={formData.aiPolicy} onChange={e => setFormData({...formData, aiPolicy: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label form-label-with-icon">
                  <AlertTriangle size={14} className="text-orange-500" /> Plagiarism Rules
                </label>
                <textarea placeholder="Note cross-submission or self-plagiarism constraints..." className="input-field h-24 resize-none" value={formData.plagiarismPolicy} onChange={e => setFormData({...formData, plagiarismPolicy: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Registration Fees</label>
                <input placeholder="E.g., $450 (Standard), $200 (Student)" className="input-field" value={formData.fees} onChange={e => setFormData({...formData, fees: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Page Limit</label>
                <input type="number" placeholder="Total allowed pages" className="input-field" value={formData.pageLimit} onChange={e => setFormData({...formData, pageLimit: e.target.value})} />
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn btn-outline px-10 rounded-2xl h-14 font-bold">Cancel</button>
          <button type="submit" className="btn btn-primary px-12 rounded-2xl h-14 shadow-xl">Complete Registration</button>
        </div>
      </form>
    </div>
  );
};

export default AddConference;
