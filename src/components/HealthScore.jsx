import React from 'react';
import * as Icons from './Icons';
import { healthScore } from '../data/mockFinancialData';
import './HealthScore.css';

export default function HealthScore({ score, previousScore, trend }) {
  const scoreColor =
    score >= 70
      ? 'var(--accent-success)'
      : score >= 40
        ? 'var(--accent-warning-dark)'
        : 'var(--accent-danger)';

  const scoreLabel =
    score >= 70
      ? 'Saúde Financeira Forte'
      : score >= 40
        ? 'Saúde Financeira Regular'
        : 'Saúde Financeira Crítica';

  const TrendIconComponent = trend === 'declining' ? Icons.TrendingDownIcon : trend === 'improving' ? Icons.TrendingUpIcon : Icons.ArrowRightIcon;
  const trendColor =
    trend === 'declining'
      ? 'var(--accent-danger)'
      : trend === 'improving'
        ? 'var(--accent-success)'
        : 'var(--text-secondary)';

  return (
    <div className="financial-health-card" id="health-score">
      <div className="health-header">
        <Icons.WalletIcon size={18} className="health-header-icon" />
        <h3 className="health-title">Saúde Financeira</h3>
      </div>

      <div className="health-score-summary">
        <div className="health-score-digits">
          <span className="digits-value" style={{ color: scoreColor }}>{score}</span>
          <span className="digits-total">/100</span>
        </div>
        <div className="health-score-info">
          <span className="health-score-label" style={{ color: scoreColor }}>{scoreLabel}</span>
          <div className="health-trend-row" style={{ color: trendColor }}>
            <TrendIconComponent size={14} className="health-trend-icon" />
            <span className="health-trend-text">
              {trend === 'declining' ? 'Caiu' : trend === 'improving' ? 'Subiu' : 'Estável'} de {previousScore} no mês anterior
            </span>
          </div>
        </div>
      </div>

      <div className="health-meter-track">
        <div 
          className="health-meter-fill" 
          style={{ width: `${score}%`, backgroundColor: scoreColor }}
        />
      </div>

      <div className="health-factors-section">
        <h4 className="factors-title">Indicadores de Diagnóstico</h4>
        <div className="factors-list">
          {healthScore.factors.map((factor) => {
            const factorColor =
              factor.score >= 70
                ? 'var(--accent-success)'
                : factor.score >= 50
                  ? 'var(--accent-warning-dark)'
                  : 'var(--accent-danger)';

            return (
              <div key={factor.name} className="factor-item">
                <div className="factor-info-row">
                  <span className="factor-name">{factor.name}</span>
                  <span className="factor-score-val" style={{ color: factorColor }}>{factor.score}%</span>
                </div>
                <div className="factor-bar">
                  <div 
                    className="factor-bar-fill" 
                    style={{ width: `${factor.score}%`, backgroundColor: factorColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
