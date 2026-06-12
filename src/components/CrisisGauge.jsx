import React from 'react';
import * as Icons from './Icons';
import './CrisisGauge.css';

export default function CrisisGauge({ days, severity, confidence }) {
  const severityColor =
    severity === 'danger'
      ? 'var(--accent-danger)'
      : severity === 'warning'
        ? 'var(--accent-warning-dark)'
        : 'var(--accent-success)';

  const severityBg =
    severity === 'danger'
      ? 'var(--accent-danger-light)'
      : severity === 'warning'
        ? 'var(--accent-warning-light)'
        : 'var(--accent-success-light)';

  const severityLabel =
    severity === 'danger'
      ? 'Risco Crítico de Liquidez'
      : severity === 'warning'
        ? 'Risco Moderado'
        : 'Margem de Segurança'

  const riskPercent = Math.max(0, Math.min(100, ((30 - days) / 30) * 100)); // risk is higher when days are lower

  return (
    <div className="crisis-indicator-card" id="crisis-gauge">
      <div className="indicator-header">
        <Icons.CalendarIcon size={18} className="indicator-header-icon" />
        <h3 className="indicator-title">Risco de Liquidez</h3>
      </div>

      <div className="indicator-status-badge" style={{ backgroundColor: severityBg, color: severityColor, borderColor: severityColor }}>
        {severityLabel}
      </div>

      <div className="indicator-body">
        <div className="indicator-metric-row">
          <span className="metric-value">{days} dias</span>
          <span className="metric-label">para possível saldo negativo</span>
        </div>

        <div className="indicator-meter-track">
          <div 
            className="indicator-meter-fill" 
            style={{ 
              width: `${riskPercent}%`, 
              backgroundColor: severityColor 
            }}
          />
        </div>

        <div className="indicator-meta">
          <span className="meta-item">Assertividade: <strong>{confidence}%</strong></span>
          <span className="meta-item">Horizonte: <strong>15d</strong></span>
        </div>
      </div>
    </div>
  );
}
