import React from 'react';
import { Calendar, Globe, FileText, Bot, AlertTriangle, ExternalLink } from 'lucide-react';
import './ConferenceCard.css';

const ConferenceCard = ({ conference }) => {
  const getDaysLeft = (date) => {
    if (!date) return null;
    const diff = new Date(date) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysLeft(conference.submissionDeadline);

  const getDeadlineStatus = (days) => {
    if (days === null) return { class: 'badge-primary', label: 'TBA' };
    if (days < 0) return { class: 'badge-danger', label: 'Deadline Passed' };
    if (days < 30) return { class: 'badge-warning', label: `${days}d Remaining` };
    return { class: 'badge-success', label: `${days}d Remaining` };
  };

  const status = getDeadlineStatus(daysLeft);

  return (
    <div className="card card-conference animate-enter">
      <div className="card-header">
        <div className="card-title-section">
          <span className="badge badge-primary w-fit">{conference.ranking || 'Conference'}</span>
          <h2 className="card-title">{conference.name}</h2>
        </div>
        <div className={`badge ${status.class} whitespace-nowrap`}>
          {status.label}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="deadline-row">
          <div className="deadline-info">
            <Calendar size={16} className="text-primary" />
            <span>Submission</span>
          </div>
          <span className="text-muted-foreground">{conference.submissionDeadline || 'TBA'}</span>
        </div>
        <div className="deadline-row">
          <div className="deadline-info">
            <Calendar size={16} className="text-primary" />
            <span>Notification</span>
          </div>
          <span className="text-muted-foreground">{conference.notificationDate || 'TBA'}</span>
        </div>
      </div>

      <div className="policy-tags">
        <div className="policy-tag group">
          <Bot size={14} />
          <span>AI POLICY</span>
          <div className="policy-tooltip glass shadow-xl">
            <p className="tooltip-text">{conference.aiPolicy || 'Policy not specified.'}</p>
          </div>
        </div>
        <div className="policy-tag plagiarism group">
          <AlertTriangle size={14} />
          <span>PLAGIARISM</span>
          <div className="policy-tooltip glass shadow-xl" style={{left: '50%', transform: 'translateX(-50%)'}}>
            <p className="tooltip-text">{conference.plagiarismPolicy || 'Policy not specified.'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-lg text-xs font-bold text-muted-foreground ml-auto">
          <FileText size={14} />
          <span>{conference.pageLimit || '?'} PAGES</span>
        </div>
      </div>

      <div className="card-footer">
        <a 
          href={conference.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-outline flex-1 py-2 text-sm"
        >
          <ExternalLink size={14} />
          View Website
        </a>
        <div className="fees-display">
          <span className="fees-label">FEES</span>
          <span className="fees-amount">{conference.fees || 'TBA'}</span>
        </div>
      </div>
    </div>
  );
};

export default ConferenceCard;
