import * as Icons from './Icons';
import './AlertCard.css';

export default function AlertCard({ alert, index }) {
  const severityClass =
    alert.severity === 'danger'
      ? 'alert-danger'
      : alert.severity === 'warning'
        ? 'alert-warning'
        : 'alert-info';

  const IconComponent = 
    alert.severity === 'danger' || alert.severity === 'warning'
      ? Icons.AlertCircleIcon
      : Icons.InfoIcon;

  return (
    <div
      className={`alert-card ${severityClass} animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.15}s` }}
      id={`alert-${alert.id}`}
    >
      <div className="alert-severity-bar"></div>
      <div className="alert-content">
        <div className="alert-header">
          <IconComponent size={18} className="alert-svg-icon" />
          <div className="alert-meta">
            <h4 className="alert-title">{alert.title}</h4>
            <span className="alert-category">{alert.category}</span>
          </div>
          <span className="alert-trend">{alert.trend}</span>
        </div>
        <p className="alert-description">{alert.description}</p>
        <button className="alert-action btn-secondary" id={`alert-action-${alert.id}`}>
          {alert.action}
        </button>
      </div>
    </div>
  );
}
