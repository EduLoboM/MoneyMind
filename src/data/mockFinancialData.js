// MoneyMind — Dados Financeiros Mockados (Persona Geral)
// Simula 30 dias de gastos + 15 dias de projeção da IA

// Gerar data formatada
function getDateLabel(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
}

// Gastos diários reais (últimos 30 dias) + projeção (próximos 15 dias)
// Adaptado para orçamento geral (salário R$2400 + renda extra/freelance R$1500)
export const spendingTimeline = [
  // Últimos 30 dias - gastos reais
  ...Array.from({ length: 30 }, (_, i) => {
    const dayOffset = i - 29;
    const baseSpend = 50 + Math.sin(i * 0.7) * 15;
    // Simula picos de gastos (finais de semana ou compras de eletrônicos/lazer)
    const digitalLazerBoost = (i === 5 || i === 15 || i === 25) ? 120 : 0;
    const appTransportBoost = (i % 5 === 0) ? 45 : 0;
    const actual = Math.round(baseSpend + digitalLazerBoost + appTransportBoost + Math.random() * 10);
    return {
      date: getDateLabel(dayOffset),
      actual,
      projected: null,
      budget: 100,
      type: 'real',
    };
  }),
  // Próximos 15 dias - projeção da IA
  ...Array.from({ length: 15 }, (_, i) => {
    const dayOffset = i + 1;
    // Projeção mostra tendência de estouro por conveniências acumuladas e compras digitais
    const baseProjection = 75 + i * 6.5;
    const variance = Math.random() * 15;
    const projected = Math.round(baseProjection + variance);
    return {
      date: getDateLabel(dayOffset),
      actual: null,
      projected,
      budget: 100,
      type: 'projection',
    };
  }),
];

// Gastos acumulados no mês
export const monthlySpending = {
  total: 2150,
  budget: 2800,
  remaining: 650,
  daysLeft: 10,
  projectedTotal: 3250,
  projectedOverBudget: 450,
};

// Score de saúde financeira (0-100)
export const healthScore = {
  current: 71,
  previousMonth: 84,
  trend: 'declining',
  factors: [
    { name: 'Controle de Lazer', score: 55, weight: 0.3 },
    { name: 'Economia em Transporte', score: 60, weight: 0.25 },
    { name: 'Alimentação Diária', score: 85, weight: 0.2 },
    { name: 'Aproveitamento de Renda Extra', score: 75, weight: 0.15 },
    { name: 'Consistência de Contas', score: 90, weight: 0.1 },
  ],
};

// Dias até a crise de saldo prevista
export const crisisData = {
  daysUntilCrisis: 8,
  severity: 'warning', // 'safe' | 'warning' | 'danger'
  confidence: 90,
  mainCause: 'Acúmulo de compras digitais de lazer e transporte de conveniência',
  projectedDeficit: 450,
};

// Alertas e nudges (sem emojis) - Persona Geral
export const alerts = [
  {
    id: 1,
    severity: 'danger',
    title: 'Compras Digitais em Alta',
    description:
      'Seus gastos com plataformas de jogos, assinaturas e lazer digital somaram R$ 229,80 nos últimos 7 dias, ultrapassando o teto sugerido para a categoria.',
    action: 'Definir Teto de Lazer',
    category: 'Lazer Digital',
    trend: 'R$229,80/sem',
  },
  {
    id: 2,
    severity: 'warning',
    title: 'Transporte de Conveniência',
    description:
      'Você gastou R$ 280,00 com viagens de táxi e transporte por aplicativo este mês. Reduzir as corridas curtas evitará o estouro de saldo projetado.',
    action: 'Rever Trajetos',
    category: 'Transporte',
    trend: '+R$280,00',
  },
  {
    id: 3,
    severity: 'info',
    title: 'Renda Extra Recebida',
    description:
      'Sua receita extra de R$ 1.500,00 foi identificada. Destinar R$ 800,00 ao CDB com Liquidez Diária do BB estabiliza seu fluxo e gera rendimentos imediatos.',
    action: 'Investir Sobra',
    category: 'Investimentos',
    trend: '+R$800,00',
  },
];

// Extrato Comportamental Recente (Rotulagem psicográfica adaptada para público geral)
export const recentTransactions = [
  { date: '08/06', description: 'Compra de Skin Fortnite', category: 'Lazer e Jogos', amount: 79.90, behavior: 'Compra Espontânea', behaviorType: 'impulsivo' },
  { date: '08/06', description: 'Refeição Executiva Diária', category: 'Alimentação', amount: 32.00, behavior: 'Custo Essencial', behaviorType: 'guardiao' },
  { date: '07/06', description: 'Uber Corrida Curta Trabalho', category: 'Transporte', amount: 34.90, behavior: 'Conveniência', behaviorType: 'impulsivo' },
  { date: '07/06', description: 'Café e Salgado na Padaria', category: 'Alimentação', amount: 14.50, behavior: 'Café / Lanche Rápido', behaviorType: 'impulsivo' },
  { date: '06/06', description: 'Limbus Company Lunacy', category: 'Lazer e Jogos', amount: 99.90, behavior: 'Compra Espontânea', behaviorType: 'impulsivo' },
  { date: '05/06', description: 'Carga Bilhete Único', category: 'Transporte', amount: 44.00, behavior: 'Custo Essencial', behaviorType: 'guardiao' },
  { date: '04/06', description: 'Refeição Executiva Diária', category: 'Alimentação', amount: 32.00, behavior: 'Custo Essencial', behaviorType: 'guardiao' },
  { date: '03/06', description: 'Renda Extra de Freelance', category: 'Renda', amount: 1500.00, behavior: 'Reserva / Investimento', behaviorType: 'desbravador' },
  { date: '02/06', description: 'Mensalidade Academia', category: 'Lazer e Jogos', amount: 110.00, behavior: 'Custo Essencial', behaviorType: 'guardiao' },
  { date: '01/06', description: 'Salário Fixo Banco do Brasil', category: 'Renda', amount: 2400.00, behavior: 'Salário Fixo', behaviorType: 'equilibrista' },
];

// Gastos por categoria gerais
export const categoryBreakdown = [
  { name: 'Alimentação Diária', spent: 340, budget: 500, percent: 68, color: '#0038A8' },
  { name: 'Transporte Urbano', spent: 480, budget: 400, percent: 120, color: '#ef4444' },
  { name: 'Lazer e Jogos', spent: 420, budget: 300, percent: 140, color: '#dc2626' },
  { name: 'Educação / Cursos', spent: 180, budget: 300, percent: 60, color: '#22c55e' },
  { name: 'Outros / Padaria', spent: 184, budget: 250, percent: 73, color: '#64748b' },
];

// Dados do usuário mockado (Lucas)
export const mockUser = {
  name: 'Lucas',
  profileId: null, // será preenchido pelo quiz
  monthlyIncome: 3900, // Salário R$2400 + Freelance R$1500
  accountBalance: 1850,
};
