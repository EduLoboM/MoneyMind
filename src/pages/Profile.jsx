import { useNavigate } from 'react-router-dom';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import ProfileResult from '../components/ProfileResult';
import * as Icons from '../components/Icons';
import './Profile.css';

export default function Profile({ profile }) {
  const navigate = useNavigate();

  if (!profile) {
    return (
      <div className="page-wrapper profile-page" id="profile-page">
        <div className="container">
          <div className="no-profile">
            <h2>Nenhum perfil identificado</h2>
            <p>Complete o quiz para descobrir seu perfil psicográfico financeiro.</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/quiz')}
              id="go-to-quiz"
            >
              <span>Fazer o Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const radarData = [
    { subject: 'Poupança', value: profile.radarData.poupanca },
    { subject: 'Risco', value: profile.radarData.risco },
    { subject: 'Planejamento', value: profile.radarData.planejamento },
    { subject: 'Controle', value: profile.radarData.controle },
    { subject: 'Investimento', value: profile.radarData.investimento },
  ];

  return (
    <div className="page-wrapper profile-page" id="profile-page">
      <div className="container">
        {/* Reveal header */}
        <div className="profile-reveal animate-fade-in-up">
          <p className="reveal-label">Diagnóstico de Perfil Financeiro</p>
        </div>

        {/* Profile card */}
        <ProfileResult profile={profile} />

        {/* Radar Chart */}
        <section className="profile-radar glass-card animate-fade-in-up delay-2" id="radar-section">
          <h3 className="radar-title">Seu Mapa Comportamental</h3>
          <div className="radar-wrapper">
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid
                  stroke="#cbd5e1"
                  gridType="polygon"
                />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: 'var(--text-primary)',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Perfil"
                  dataKey="value"
                  stroke={profile.color}
                  fill={profile.color}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Strengths & Watch Points */}
        <div className="profile-details">
          <section className="detail-section glass-card animate-fade-in-up delay-3" id="strengths-section">
            <h3 className="detail-title">
              <Icons.CheckIcon size={18} className="detail-icon" style={{ color: 'var(--accent-success)' }} />
              Pontos Fortes
            </h3>
            <ul className="detail-list">
              {profile.strengths.map((s, i) => (
                <li key={i} className="detail-item success">
                  <span className="item-dot"></span>
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="detail-section glass-card animate-fade-in-up delay-4" id="watchpoints-section">
            <h3 className="detail-title">
              <Icons.AlertCircleIcon size={18} className="detail-icon" style={{ color: 'var(--accent-warning-dark)' }} />
              Pontos de Atenção
            </h3>
            <ul className="detail-list">
              {profile.watchPoints.map((w, i) => (
                <li key={i} className="detail-item warning">
                  <span className="item-dot"></span>
                  {w}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Nudge Strategy */}
        <section className="nudge-section glass-card animate-fade-in-up delay-5" id="nudge-section">
          <h3 className="nudge-title">
            <Icons.InfoIcon size={18} className="detail-icon" style={{ color: 'var(--accent-primary)' }} />
            Diretrizes e Recomendações
          </h3>
          <p className="nudge-text">{profile.nudgeStrategy}</p>
        </section>

        {/* CTA */}
        <div className="profile-cta animate-fade-in-up delay-6">
          <button
            className="btn-primary btn-hero"
            onClick={() => navigate('/dashboard')}
            id="go-to-dashboard"
          >
            <span>Ver Painel Preditivo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
