import { Link, useLocation } from 'react-router-dom';
import * as Icons from './Icons';
import './Navbar.css';

export default function Navbar({ profile, level = 2, xp = 350, nextLevelXp = 1000 }) {
  const location = useLocation();

  // Resolver o ícone de acordo com o perfil
  const ProfileIconComponent = profile ? Icons[profile.iconName] : null;
  const xpPercent = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner container">
        <Link to={profile ? "/dashboard" : "/"} className="navbar-logo" id="logo-link">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="3"
            strokeLinecap="square"
            style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}
          >
            <rect x="2" y="2" width="14" height="14" />
            <rect x="8" y="8" width="14" height="14" fill="var(--bg-surface)" stroke="var(--accent-primary)" strokeWidth="2" />
          </svg>
          <span className="logo-text">MoneyMind</span>
        </Link>

        <div className="navbar-actions">
          {profile ? (
            <div className="navbar-gamified-info animate-fade-in">
              {/* Barra de XP */}
              <div className="navbar-xp-container" title={`${xp}/${nextLevelXp} XP para o próximo nível`}>
                <div className="navbar-level-badge">
                  Nível {level}
                </div>
                <div className="navbar-xp-track">
                  <div
                    className="navbar-xp-fill"
                    style={{
                      width: `${xpPercent}%`,
                      backgroundColor: profile.color || 'var(--accent-primary)',
                    }}
                  ></div>
                </div>
                <span className="navbar-xp-text">{xp}/{nextLevelXp} XP</span>
              </div>

              {/* Pill de Perfil */}
              <div
                className="navbar-profile-pill"
                style={{
                  borderColor: profile.color,
                  background: profile.bgGlow || 'rgba(0, 56, 168, 0.05)',
                  color: profile.color,
                }}
              >
                {ProfileIconComponent && <ProfileIconComponent size={14} className="navbar-profile-icon" />}
                <span className="navbar-profile-name">{profile.name}</span>
              </div>

              {/* Botão para ir ao Dashboard ou voltar */}
              {location.pathname === '/dashboard' ? (
                <Link to="/" className="btn-dashboard-nav" id="nav-landing-btn">
                  Início
                </Link>
              ) : (
                <Link to="/dashboard" className="btn-dashboard-nav" id="nav-dashboard-btn">
                  Dashboard
                </Link>
              )}
            </div>
          ) : (
            <div className="navbar-guest-actions">
              {location.pathname === '/dashboard' ? (
                <Link to="/" className="btn-demo-nav" id="nav-home-btn">
                  Início
                </Link>
              ) : (
                <Link to="/dashboard" className="btn-demo-nav" id="nav-demo-btn">
                  Ver Demo
                </Link>
              )}
              {location.pathname !== '/quiz' && (
                <Link to="/quiz" className="btn-primary btn-quiz-nav" id="nav-quiz-btn">
                  <span>Mapear Perfil</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

