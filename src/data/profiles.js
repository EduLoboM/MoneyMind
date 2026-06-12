// MoneyMind — 4 Perfis Psicográficos Financeiros
// Baseado no framework BIT (Behavioral Investor Types) de Pompian,
// adaptado para o contexto brasileiro de finanças pessoais.
// Cores alinhadas à paleta Banco do Brasil.

const profiles = {
  guardiao: {
    id: 'guardiao',
    name: 'Guardião',
    iconName: 'ShieldIcon',
    color: '#0038A8',
    gradient: 'linear-gradient(135deg, #0038A8, #1a5cc8)',
    bgGlow: 'rgba(0, 56, 168, 0.12)',
    description:
      'Você é uma fortaleza financeira. Prioriza segurança e estabilidade acima de tudo, preferindo manter o controle total sobre cada real. Sua cautela é sua maior força — mas cuidado para não perder oportunidades por excesso de conservadorismo.',
    strengths: [
      'Excelente controle de gastos',
      'Reserva de emergência sempre em dia',
      'Disciplina consistente com orçamento',
    ],
    watchPoints: [
      'Pode perder oportunidades de investimento',
      'Tende a evitar riscos mesmo quando calculados',
      'Às vezes sacrifica qualidade de vida por economia',
    ],
    nudgeStrategy:
      'Apresentar oportunidades de baixo risco com retornos consistentes. Mostrar como diversificação controlada pode proteger ainda mais seu patrimônio.',
    populationPercent: 28,
    radarData: {
      poupanca: 95,
      risco: 15,
      planejamento: 90,
      controle: 92,
      investimento: 40,
    },
  },

  desbravador: {
    id: 'desbravador',
    name: 'Desbravador',
    iconName: 'RocketIcon',
    color: '#F9DD16',
    gradient: 'linear-gradient(135deg, #F9DD16, #ffe44d)',
    bgGlow: 'rgba(249, 221, 22, 0.1)',
    description:
      'Você é um explorador financeiro nato. Busca crescimento, aceita volatilidade e está sempre de olho na próxima oportunidade. Sua coragem de investir é admirável — mas atenção para não confundir ousadia com imprudência.',
    strengths: [
      'Mentalidade de crescimento patrimonial',
      'Aberto a novas oportunidades financeiras',
      'Não paralisa diante de incertezas',
    ],
    watchPoints: [
      'Pode subestimar riscos de investimentos',
      'Tendência a concentrar em poucos ativos',
      'Às vezes ignora a reserva de emergência',
    ],
    nudgeStrategy:
      'Alertar sobre concentração de risco e importância da diversificação. Sugerir metas de reserva antes de novos investimentos.',
    populationPercent: 22,
    radarData: {
      poupanca: 45,
      risco: 85,
      planejamento: 60,
      controle: 50,
      investimento: 92,
    },
  },

  impulsivo: {
    id: 'impulsivo',
    name: 'Impulsivo',
    iconName: 'FlashIcon',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
    bgGlow: 'rgba(239, 68, 68, 0.1)',
    description:
      'Você vive o momento e suas finanças refletem isso. Gastos emocionais e compras por impulso são seus maiores desafios. A boa notícia? Com os nudges certos, você pode manter a espontaneidade sem comprometer seu futuro.',
    strengths: [
      'Sabe aproveitar a vida sem culpa',
      'Rápido para tomar decisões',
      'Generoso com pessoas importantes',
    ],
    watchPoints: [
      'Gastos emocionais frequentes',
      'Dificuldade em manter orçamento',
      'Presente-bias: prioriza o agora sobre o futuro',
    ],
    nudgeStrategy:
      'Speed bumps antes de compras grandes. Regra dos 72h para gastos acima de R$200. Gamificação de metas de economia com recompensas.',
    populationPercent: 31,
    radarData: {
      poupanca: 25,
      risco: 60,
      planejamento: 20,
      controle: 18,
      investimento: 30,
    },
  },

  equilibrista: {
    id: 'equilibrista',
    name: 'Equilibrista',
    iconName: 'ScaleIcon',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #4ade80)',
    bgGlow: 'rgba(34, 197, 94, 0.1)',
    description:
      'Você é o maestro das finanças pessoais. Equilibra gastos e poupança com pragmatismo, planeja sem ser rígido e investe com consciência. Seu desafio é manter essa consistência quando a vida surpreende.',
    strengths: [
      'Equilíbrio entre viver e poupar',
      'Planejamento flexível e realista',
      'Decisões financeiras racionais',
    ],
    watchPoints: [
      'Pode se acomodar na zona de conforto',
      'Tende a adiar decisões de investimento',
      'Às vezes falta ambição financeira',
    ],
    nudgeStrategy:
      'Desafios de crescimento graduais. Mostrar potencial de ganho com ajustes pequenos. Celebrar consistência e propor o próximo nível.',
    populationPercent: 19,
    radarData: {
      poupanca: 70,
      risco: 50,
      planejamento: 80,
      controle: 75,
      investimento: 65,
    },
  },
};

export default profiles;
