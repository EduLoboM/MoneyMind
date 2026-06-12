import * as Icons from './Icons';
import './ProfileResult.css';

export default function ProfileResult({ profile }) {
  const IconComponent = Icons[profile.iconName] || Icons.InfoIcon;

  return (
    <div
      className="profile-result-card"
      style={{
        '--profile-color': profile.color,
        borderLeft: `6px solid ${profile.color}`,
      }}
      id="profile-result-card"
    >
      <div className="profile-icon-wrapper">
        <IconComponent size={44} className="profile-icon-svg" />
      </div>
      <h2
        className="profile-name"
        style={{ color: profile.color }}
      >
        {profile.name}
      </h2>
      <p className="profile-population">
        {profile.populationPercent}% dos brasileiros compartilham este perfil
      </p>
      <p className="profile-description">{profile.description}</p>
    </div>
  );
}
