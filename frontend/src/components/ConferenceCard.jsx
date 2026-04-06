import React from 'react';
import { Calendar, Globe, FileText, Bot, AlertTriangle, ExternalLink } from 'lucide-react';

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
    <div className="card flex flex-col gap-6 animate-enter hover:bg-muted/10">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-2">
          <span className="badge badge-primary w-fit">{conference.ranking || 'Conference'}</span>
          <h2 className="text-xl font-bold tracking-tight leading-tight">{conference.name}</h2>
        </div>
        <div className={`badge ${status.class} whitespace-nowrap`}>
          {status.label}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm p-3 bg-muted/40 rounded-xl">
          <div className="flex items-center gap-2 font-semibold">
            <Calendar size={16} className="text-primary" />
            <span>Submission</span>
          </div>
          <span className="text-muted-foreground">{conference.submissionDeadline || 'TBA'}</span>
        </div>
        <div className="flex items-center justify-between text-sm p-3 bg-muted/40 rounded-xl">
          <div className="flex items-center gap-2 font-semibold">
            <Calendar size={16} className="text-primary" />
            <span>Notification</span>
          </div>
          <span className="text-muted-foreground">{conference.notificationDate || 'TBA'}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-dashed border-border">
        <div className="group relative flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-lg text-xs font-bold cursor-help transition-all hover:bg-primary/10 hover:text-primary">
          <Bot size={14} />
          <span>AI POLICY</span>
          <div className="absolute bottom-full left-0 mb-3 w-56 p-3 glass rounded-xl hidden group-hover:block z-20 shadow-xl border-primary/20">
            <p className="text-[11px] leading-relaxed font-medium">{conference.aiPolicy || 'Policy not specified.'}</p>
          </div>
        </div>
        <div className="group relative flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-lg text-xs font-bold cursor-help transition-all hover:bg-orange-500/10 hover:text-orange-600">
          <AlertTriangle size={14} />
          <span>PLAGIARISM</span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 glass rounded-xl hidden group-hover:block z-20 shadow-xl border-orange-500/20">
            <p className="text-[11px] leading-relaxed font-medium">{conference.plagiarismPolicy || 'Policy not specified.'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-lg text-xs font-bold text-muted-foreground ml-auto">
          <FileText size={14} />
          <span>{conference.pageLimit || '?'} PAGES</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <a 
          href={conference.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-outline flex-1 py-2 text-sm"
        >
          <ExternalLink size={14} />
          View Website
        </a>
        <div className="text-right px-2">
          <span className="block text-[10px] text-muted-foreground font-bold uppercase">FEES</span>
          <span className="text-sm font-bold text-foreground">{conference.fees || 'TBA'}</span>
        </div>
      </div>
    </div>
  );
};

export default ConferenceCard;
