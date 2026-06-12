import React from 'react';

// Estrutura comum de props de ícone
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  style: { display: 'inline-block', verticalAlign: 'middle', overflow: 'visible' }
};

export function ShieldIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function RocketIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5C4 22 6 21 7.5 19.5" />
      <path d="M12 12l9-9-3 12-6 3-3-3-3-3 6-3z" />
      <path d="M9 15l-3 3" />
      <path d="M15 9l3-3" />
    </svg>
  );
}

export function FlashIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function ScaleIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2v-1M8 16V4a2 2 0 012-2h11a2 2 0 012 2v12M12 8h8M12 12h8" />
    </svg>
  );
}

export function AlertCircleIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="0" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function InfoIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="0" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function CheckIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export function TrendingDownIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function WalletIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="0" />
      <path d="M12 11h10M17 8v6" />
    </svg>
  );
}

export function CalendarIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <rect x="3" y="4" width="18" height="18" rx="0" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function CreditCardIcon({ size = 20, className = "" }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <rect x="2" y="5" width="20" height="14" rx="0" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}
