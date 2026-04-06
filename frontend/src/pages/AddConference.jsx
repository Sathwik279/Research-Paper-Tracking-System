import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { conferenceApi } from '../api';
import { ArrowLeft, Save, Globe, Calendar, Info, Bot, AlertCircle, FileDigit } from 'lucide-react';

const AddConference = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    submissionDeadline: '',
    notificationDate: '',
    eventDate: '',
    fees: '',
    plagiarismPolicy: '',
    aiPolicy: '',
    pageLimit: '',
    ranking: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    <div className="container mx-auto px-6 py-28 max-w-5xl animate-enter">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-all font-bold uppercase tracking-widest text-xs">
        <ArrowLeft size={18} />
        <span>Back to Directory</span>
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 glass p-10 rounded-[2.5rem] shadow-2xl border-white/40">
        <header className="flex flex-col gap-3">
          <div className="badge badge-primary w-fit">Registry</div>
          <h2 className="text-4xl font-extrabold tracking-tight">Register <span className="text-primary">Venue</span></h2>
          <p className="text-muted-foreground text-lg font-medium">Log a conference venue to your personalized tracker to monitor its specific constraints and deadlines.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Conference Designation *</label>
            <input required name="name" value={formData.name} onChange={handleChange} className="input-field text-lg font-bold" placeholder="E.g. NeurIPS 2024" />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <Globe size={14} className="text-primary" /> Official URL
            </label>
            <input name="url" value={formData.url} onChange={handleChange} className="input-field font-medium" placeholder="https://..." />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <Calendar size={14} className="text-primary" /> Submission Threshold
            </label>
            <input type="date" name="submissionDeadline" value={formData.submissionDeadline} onChange={handleChange} className="input-field font-bold" />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <Calendar size={14} className="text-primary" /> Notification Date
            </label>
            <input type="date" name="notificationDate" value={formData.notificationDate} onChange={handleChange} className="input-field font-bold" />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Ranking / Tier</label>
            <input name="ranking" value={formData.ranking} onChange={handleChange} className="input-field font-bold uppercase" placeholder="CORE A*, Q1..." />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Registration Fees</label>
            <input name="fees" value={formData.fees} onChange={handleChange} className="input-field font-bold" placeholder="$..." />
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-dashed border-border pt-10">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary"><Info size={22} /></div>
            Researcher Constraints
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <Bot size={14} className="text-primary" /> Gen-AI Policy
              </label>
              <textarea name="aiPolicy" value={formData.aiPolicy} onChange={handleChange} className="input-field h-32 resize-none leading-relaxed" placeholder="Summarize the venue's policy on generative AI usage..." />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <AlertCircle size={14} className="text-orange-500" /> Plagiarism Checks
              </label>
              <textarea name="plagiarismPolicy" value={formData.plagiarismPolicy} onChange={handleChange} className="input-field h-32 resize-none leading-relaxed" placeholder="Detail any similarity index thresholds or policy specifics..." />
            </div>
          </div>

          <div className="flex flex-col gap-3 max-w-sm">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <FileDigit size={14} className="text-primary" /> Maximum Page Count
            </label>
            <input type="number" name="pageLimit" value={formData.pageLimit} onChange={handleChange} className="input-field font-bold" placeholder="E.g. 10" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 pt-4">
          <button type="button" onClick={() => navigate('/')} className="btn btn-outline px-10 h-14 rounded-2xl font-extrabold text-muted-foreground hover:text-foreground">Discard Changes</button>
          <button type="submit" className="btn btn-primary px-12 h-14 rounded-2xl text-lg shadow-xl hover:scale-[1.02]">
            <Save size={24} />
            <span>Save Venue</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddConference;
