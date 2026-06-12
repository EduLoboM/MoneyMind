import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import ProfileResult from '../components/ProfileResult';
import CrisisGauge from '../components/CrisisGauge';
import HealthScore from '../components/HealthScore';
import SpendingChart from '../components/SpendingChart';
import AlertCard from '../components/AlertCard';
import * as Icons from '../components/Icons';
import {
  spendingTimeline,
  monthlySpending,
  healthScore,
  crisisData,
  alerts,
  categoryBreakdown,
  recentTransactions,
  mockUser,
} from '../data/mockFinancialData';
import './Dashboard.css';

const SparklesIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5 5 3Z" />
    <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />
  </svg>
);

const RefreshIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ transition: 'transform 0.5s ease' }}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

const WEEKLY_QUESTS_POOL = [
  {
    id: 'quest_cdb',
    title: 'Aporte CDB Jovem BB',
    desc: 'Guardar R$ 150,00 de sobra de caixa no CDB de Liquidez Diária do Banco do Brasil.',
    xp: 150,
  },
  {
    id: 'quest_transporte',
    title: 'Transporte Consciente',
    desc: 'Substituir ao menos 3 corridas curtas de aplicativo por transporte coletivo esta semana.',
    xp: 100,
  },
  {
    id: 'quest_delivery',
    title: 'Chef em Casa',
    desc: 'Evitar delivery de comida por 5 dias e preparar suas próprias refeições.',
    xp: 120,
  },
  {
    id: 'quest_limite',
    title: 'Consumo sob Controle',
    desc: 'Manter seus gastos de Lazer abaixo do limite diário sugerido de R$ 30,00.',
    xp: 150,
  },
  {
    id: 'quest_assinaturas',
    title: 'Detector de Desperdício',
    desc: 'Identificar e cancelar ao menos 1 serviço de assinatura digital redundante.',
    xp: 80,
  },
  {
    id: 'quest_reserva',
    title: 'Sombra e Água Fresca',
    desc: 'Reservar R$ 50,00 adicionais para sua reserva de emergência esta semana.',
    xp: 110,
  }
];

export default function Dashboard({
  profile = null,
  gameState = { xp: 350, level: 2, justLeveledUp: false },
  addXp = () => {},
  clearLevelUpNotification = () => {}
}) {
  const userName = mockUser.name;
  const location = useLocation();

  // Abas do Painel: 'financial' | 'quests' | 'profile'
  const [activeTab, setActiveTab] = useState('financial');

  // Controle da exibição do modal de celebração
  const [showCelebration, setShowCelebration] = useState(false);

  // Controle local das missões gamificadas fixas (Boas-vindas/Quiz)
  const [completedQuests, setCompletedQuests] = useState(() => {
    const saved = localStorage.getItem('moneymind_completed_quests');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (profile && !parsed.quest3) {
        parsed.quest3 = true;
      }
      return parsed;
    }
    return {
      quest3: profile ? true : false,
    };
  });

  useEffect(() => {
    localStorage.setItem('moneymind_completed_quests', JSON.stringify(completedQuests));
  }, [completedQuests]);

  // Missões semanais ativas (Customizadas por IA)
  const [weeklyQuests, setWeeklyQuests] = useState(() => {
    const saved = localStorage.getItem('moneymind_weekly_quests');
    if (saved) return JSON.parse(saved);
    
    const shuffled = [...WEEKLY_QUESTS_POOL].sort(() => 0.5 - Math.random());
    const initial = shuffled.slice(0, 3);
    localStorage.setItem('moneymind_weekly_quests', JSON.stringify(initial));
    return initial;
  });

  // Estado de conclusão das missões semanais
  const [completedWeeklyQuests, setCompletedWeeklyQuests] = useState(() => {
    const saved = localStorage.getItem('moneymind_weekly_quests_completed');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('moneymind_weekly_quests', JSON.stringify(weeklyQuests));
  }, [weeklyQuests]);

  useEffect(() => {
    localStorage.setItem('moneymind_weekly_quests_completed', JSON.stringify(completedWeeklyQuests));
  }, [completedWeeklyQuests]);

  const [isResetting, setIsResetting] = useState(false);

  // Cores personalizadas para as categorias das transações
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Alimentação':
      case 'Alimentação Diária':
        return { bg: 'rgba(0, 56, 168, 0.05)', border: 'rgba(0, 56, 168, 0.18)', text: 'var(--accent-primary-dark)' };
      case 'Transporte':
      case 'Transporte Urbano':
        return { bg: 'rgba(239, 68, 68, 0.05)', border: 'rgba(239, 68, 68, 0.18)', text: 'var(--accent-danger)' };
      case 'Lazer e Jogos':
      case 'Lazer':
        return { bg: 'rgba(220, 38, 38, 0.05)', border: 'rgba(220, 38, 38, 0.18)', text: 'var(--accent-danger-dark)' };
      case 'Educação / Cursos':
      case 'Educação':
        return { bg: 'rgba(34, 197, 94, 0.06)', border: 'rgba(34, 197, 94, 0.18)', text: 'var(--accent-success-dark)' };
      case 'Renda':
        return { bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.25)', text: 'var(--accent-success)' };
      case 'Investimentos':
      case 'Investimento':
        return { bg: 'rgba(2, 132, 199, 0.06)', border: 'rgba(2, 132, 199, 0.18)', text: 'var(--accent-info)' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.06)', border: 'rgba(100, 116, 139, 0.15)', text: 'var(--text-secondary)' };
    }
  };

  // Lançamentos futuros previstos pela inteligência analítica do MoneyMind
  const projectedFutureTransactions = [
    {
      date: 'Em 2 dias',
      description: 'Assinatura Spotify Premium',
      category: 'Lazer e Jogos',
      amount: 21.90,
      behaviorType: 'impulsivo',
      behavior: 'Assinatura / Recorrência',
      probability: 95,
      action: 'Risco de Compra Automática'
    },
    {
      date: 'Em 4 dias',
      description: 'Uber Volta do Trabalho',
      category: 'Transporte Urbano',
      amount: 38.50,
      behaviorType: 'impulsivo',
      behavior: 'Compra de Conveniência',
      probability: 85,
      action: 'Sugerir transporte coletivo (-R$30)'
    },
    {
      date: 'Em 6 dias',
      description: 'Almoço Executivo Semanal',
      category: 'Alimentação Diária',
      amount: 35.00,
      behaviorType: 'guardiao',
      behavior: 'Custo Fixo Comum',
      probability: 90,
      action: 'Dentro do esperado'
    },
    {
      date: 'Em 9 dias',
      description: 'Aporte CDB Jovem BB',
      category: 'Investimentos',
      amount: 150.00,
      behaviorType: 'desbravador',
      behavior: 'Poupança Sugerida',
      probability: 75,
      action: 'Investir Sobra Estimada'
    }
  ];

  // Sincronizar o estado local da missão 3 caso o perfil seja definido
  useEffect(() => {
    if (profile) {
      setCompletedQuests((prev) => {
        if (!prev.quest3) {
          return { ...prev, quest3: true };
        }
        return prev;
      });
    }
  }, [profile]);

  // Ref para garantir que o prêmio de XP inicial e o modal rodem apenas uma vez por transição
  const xpAwardedRef = useRef(false);

  useEffect(() => {
    if (location.state?.justCompletedQuiz && !xpAwardedRef.current) {
      xpAwardedRef.current = true;
      setShowCelebration(true);
      setCompletedQuests((prev) => ({ ...prev, quest3: true }));
      
      // Conceder os 150 XP pela conclusão
      addXp(150);

      // Limpar o estado de navegação para evitar loops
      window.history.replaceState({}, document.title);
    }
  }, [location.state, addXp]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  // Resolução do ícone comportamental
  const ProfileIconComponent = profile ? Icons[profile.iconName] : null;

  // Montar estrutura de dados para o gráfico de Radar
  const radarData = profile ? [
    { subject: 'Poupança', value: profile.radarData.poupanca },
    { subject: 'Risco', value: profile.radarData.risco },
    { subject: 'Planejamento', value: profile.radarData.planejamento },
    { subject: 'Controle', value: profile.radarData.controle },
    { subject: 'Investimento', value: profile.radarData.investimento },
  ] : [];

  const handleToggleQuest = (questId, xpValue) => {
    setCompletedQuests((prev) => {
      const isNowCompleted = !prev[questId];
      addXp(isNowCompleted ? xpValue : -xpValue);
      return {
        ...prev,
        [questId]: isNowCompleted,
      };
    });
  };

  const handleToggleWeeklyQuest = (questId, xpValue) => {
    setCompletedWeeklyQuests((prev) => {
      const isNowCompleted = !prev[questId];
      addXp(isNowCompleted ? xpValue : -xpValue);
      return {
        ...prev,
        [questId]: isNowCompleted,
      };
    });
  };

  const handleResetWeeklyQuests = () => {
    setIsResetting(true);
    setTimeout(() => {
      // Reverter XP de missões concluídas antes de resetar
      weeklyQuests.forEach((q) => {
        if (completedWeeklyQuests[q.id]) {
          addXp(-q.xp);
        }
      });

      // Gerar novas missões customizadas pela "IA"
      const shuffled = [...WEEKLY_QUESTS_POOL].sort(() => 0.5 - Math.random());
      const nextQuests = shuffled.slice(0, 3);
      
      setWeeklyQuests(nextQuests);
      setCompletedWeeklyQuests({});
      setIsResetting(false);
    }, 1500);
  };

  const welcomeQuestsLeft = !completedQuests.quest3 ? 1 : 0;
  const weeklyQuestsLeft = weeklyQuests.filter(q => !completedWeeklyQuests[q.id]).length;
  const activeQuestCount = welcomeQuestsLeft + weeklyQuestsLeft;

  return (
    <div className="page-wrapper dashboard-page" id="dashboard-page">
      <div className="container">
        
        {/* Header */}
        <div className="dashboard-header animate-fade-in-up">
          <div className="header-left">
            <h1 className="dashboard-greeting">
              Olá, <span className="accent-color">{userName}</span>
            </h1>
            <p className="dashboard-subtitle">
              Fluxo de caixa inteligente com gamificação Banco do Brasil.
            </p>
          </div>
          {profile && (
            <div
              className="profile-badge"
              style={{ borderColor: `${profile.color}`, background: profile.bgGlow }}
            >
              {ProfileIconComponent && <ProfileIconComponent size={16} className="badge-icon" style={{ color: profile.color }} />}
              <span className="badge-name" style={{ color: profile.color }}>
                {profile.name}
              </span>
            </div>
          )}
        </div>

        {/* Abas do Dashboard */}
        <div className="dashboard-tabs animate-fade-in-up delay-1">
          <button
            className={`tab-btn ${activeTab === 'financial' ? 'active' : ''}`}
            onClick={() => setActiveTab('financial')}
          >
            <Icons.TrendingUpIcon size={16} />
            <span>Painel Financeiro</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'quests' ? 'active' : ''}`}
            onClick={() => setActiveTab('quests')}
          >
            <Icons.RocketIcon size={16} />
            <span>Missões & Conquistas</span>
            {activeQuestCount > 0 && (
              <span className="tab-badge">{activeQuestCount}</span>
            )}
          </button>
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Icons.ShieldIcon size={16} />
            <span>Meu Perfil</span>
            {!profile && <Icons.AlertCircleIcon size={12} className="lock-icon" />}
          </button>
        </div>

        {/* Aba 1: Painel Financeiro */}
        {activeTab === 'financial' && (
          <div className="dashboard-grid">
            
            {/* Coluna Principal */}
            <div className="dashboard-main-col animate-fade-in-up">
              
              {/* Summary Cards */}
              <div className="summary-row">
                <div className="summary-card">
                  <span className="summary-label">Gasto este mês</span>
                  <span className="summary-value">
                    {formatCurrency(monthlySpending.total)}
                  </span>
                  <span className="summary-sub">
                    Limite: {formatCurrency(monthlySpending.budget)}
                  </span>
                  <div className="summary-bar">
                    <div
                      className="summary-bar-fill"
                      style={{
                        width: `${Math.min((monthlySpending.total / monthlySpending.budget) * 100, 100)}%`,
                        background:
                          monthlySpending.total > monthlySpending.budget * 0.9
                            ? 'var(--accent-danger)'
                            : 'var(--accent-primary)',
                      }}
                    ></div>
                  </div>
                </div>

                <div className="summary-card">
                  <span className="summary-label">Restante Disponível</span>
                  <span className="summary-value accent-success">
                    {formatCurrency(monthlySpending.remaining)}
                  </span>
                  <span className="summary-sub">
                    {monthlySpending.daysLeft} dias restantes no ciclo
                  </span>
                </div>

                <div className="summary-card warning-card">
                  <span className="summary-label">Projeção de Saída</span>
                  <span className="summary-value accent-danger">
                    {formatCurrency(monthlySpending.projectedTotal)}
                  </span>
                  <span className="summary-sub">
                    {formatCurrency(monthlySpending.projectedOverBudget)} acima do limite
                  </span>
                </div>
              </div>

              {/* Spending Chart */}
              <div className="chart-section-wrapper">
                <SpendingChart data={spendingTimeline} />
              </div>

              {/* Transações Recentes */}
              <section className="transactions-section glass-card" id="transactions-section">
                <div className="section-header-row">
                  <Icons.CreditCardIcon size={18} className="section-header-icon" />
                  <h3 className="section-block-title">Análise de Transações Recentes</h3>
                </div>
                <div className="transactions-table-wrapper">
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th className="text-right">Valor</th>
                        <th>Classificação Comportamental</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((tx, idx) => {
                        const catColor = getCategoryColor(tx.category);
                        return (
                          <tr key={idx}>
                            <td className="tx-date">{tx.date}</td>
                            <td className="tx-desc">{tx.description}</td>
                            <td className="tx-cat">
                              <span
                                className="tx-cat-badge"
                                style={{
                                  backgroundColor: catColor.bg,
                                  borderColor: catColor.border,
                                  color: catColor.text
                                }}
                              >
                                {tx.category}
                              </span>
                            </td>
                            <td className="tx-amount text-right">
                              {formatCurrency(tx.amount)}
                            </td>
                            <td className="tx-behavior">
                              <span className={`tx-behavior-badge behavior-${tx.behaviorType}`}>
                                <span className="behavior-dot"></span>
                                {tx.behavior}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Previsão Comportamental de Lançamentos Futuros */}
              <section className="transactions-section glass-card" id="future-transactions-section">
                <div className="section-header-row">
                  <Icons.CalendarIcon size={18} className="section-header-icon" />
                  <h3 className="section-block-title">Previsão Comportamental de Lançamentos Futuros</h3>
                </div>
                <p className="future-tx-intro">
                  Futuras saídas de caixa estimadas nos próximos 10 dias com base no histórico comportamental.
                </p>
                <div className="future-transactions-list">
                  {projectedFutureTransactions.map((tx, idx) => {
                    const catColor = getCategoryColor(tx.category);
                    return (
                      <div key={idx} className="future-tx-card" style={{ borderLeftColor: catColor.text }}>
                        <div className="future-tx-left">
                          <span className="future-tx-date">{tx.date}</span>
                          <h4 className="future-tx-desc">{tx.description}</h4>
                          <span
                            className="tx-cat-badge"
                            style={{
                              backgroundColor: catColor.bg,
                              borderColor: catColor.border,
                              color: catColor.text
                            }}
                          >
                            {tx.category}
                          </span>
                        </div>
                        <div className="future-tx-right">
                          <span className="future-tx-amount">R$ {tx.amount.toFixed(2)}</span>
                          <span className="future-tx-prob">{tx.probability}% Probabilidade</span>
                          <span className={`future-tx-alert behavior-${tx.behaviorType}`}>
                            {tx.action}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Distribuição por Categorias */}
              <section className="categories-section glass-card" id="categories-section">
                <div className="section-header-row">
                  <Icons.TrendingUpIcon size={18} className="section-header-icon" />
                  <h3 className="categories-title">Distribuição de Consumo</h3>
                </div>
                <div className="categories-table-wrapper">
                  <table className="categories-table">
                    <thead>
                      <tr>
                        <th>Categoria</th>
                        <th className="text-right">Gasto Real</th>
                        <th className="text-right">Limite</th>
                        <th className="text-center" style={{ width: '40%' }}>Progresso</th>
                        <th className="text-right">% Gasto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryBreakdown.map((cat) => (
                        <tr key={cat.name}>
                          <td className="cat-name">
                            {cat.name}
                          </td>
                          <td className="cat-spent text-right">{formatCurrency(cat.spent)}</td>
                          <td className="cat-budget text-right">{formatCurrency(cat.budget)}</td>
                          <td className="cat-progress-cell">
                            <div className="category-bar">
                              <div
                                className="category-bar-fill"
                                style={{
                                  width: `${Math.min(cat.percent, 100)}%`,
                                  background: cat.percent > 100 ? 'var(--accent-danger)' : cat.color,
                                }}
                              ></div>
                              {cat.percent > 100 && (
                                <div
                                  className="category-bar-overflow"
                                  style={{
                                    width: `${Math.min(cat.percent - 100, 50)}%`,
                                    left: '100%',
                                  }}
                                ></div>
                              )}
                            </div>
                          </td>
                          <td className="cat-percent text-right">
                            <span
                              className="category-percent"
                              style={{
                                color:
                                  cat.percent > 100
                                    ? 'var(--accent-danger)'
                                    : cat.percent > 85
                                      ? 'var(--accent-warning-dark)'
                                      : 'var(--text-secondary)',
                              }}
                            >
                              {cat.percent}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>

            {/* Coluna Sidebar */}
            <div className="dashboard-sidebar-col animate-fade-in-up delay-1">
              
              <HealthScore
                score={healthScore.current}
                previousScore={healthScore.previousMonth}
                trend={healthScore.trend}
              />

              <CrisisGauge
                days={crisisData.daysUntilCrisis}
                severity={crisisData.severity}
                confidence={crisisData.confidence}
              />

              {/* Recomendações da IA como Checklist Gamificado */}
              <section className="ai-insight glass-card" id="ai-insight">
                <div className="insight-header">
                  <Icons.InfoIcon size={18} className="insight-icon" style={{ color: 'var(--accent-primary)' }} />
                  <h3>Ações de Prevenção Recomendadas</h3>
                </div>
                <div className="insight-checklist">
                  {weeklyQuests.map((quest) => {
                    const isCompleted = completedWeeklyQuests[quest.id] || false;
                    return (
                      <div
                        key={quest.id}
                        className={`checklist-item ${isCompleted ? 'done' : ''}`}
                        onClick={() => handleToggleWeeklyQuest(quest.id, quest.xp)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className={`checkbox-mock ${isCompleted ? 'checked' : ''}`}>
                          {isCompleted && '✓'}
                        </div>
                        <div className="checklist-content">
                          <span className="checklist-title">{quest.title} (+{quest.xp} XP)</span>
                          <span className="checklist-desc">{quest.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className={`checklist-item ${completedQuests.quest3 ? 'done' : ''}`} style={{ cursor: profile ? 'default' : 'pointer' }}>
                    <div className={`checkbox-mock ${completedQuests.quest3 ? 'checked' : ''}`}>
                      {completedQuests.quest3 && '✓'}
                    </div>
                    <div className="checklist-content">
                      <span className="checklist-title">Mapear Perfil Comportamental (+150 XP)</span>
                      <span className="checklist-desc">
                        {completedQuests.quest3
                          ? `Quiz psicográfico realizado. Perfil ${profile ? profile.name : 'Geral'} ativo.`
                          : 'Realizar o quiz para mapear seu perfil comportamental de consumo.'}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Alertas */}
              <section className="alerts-section" id="alerts-section">
                <h3 className="alerts-title">Sinalizações e Alertas</h3>
                <div className="alerts-grid">
                  {alerts.map((alert, i) => (
                    <AlertCard key={alert.id} alert={alert} index={i} />
                  ))}
                </div>
              </section>

            </div>
          </div>
        )}

        {/* Aba 2: Missões & Conquistas */}
        {activeTab === 'quests' && (
          <div className="quests-tab-content animate-fade-in">
            <div className="quests-summary-card glass-card">
              <div className="quests-summary-left">
                <h3 className="summary-level-title">Status da sua Jornada</h3>
                <p className="summary-level-desc">
                  Complete metas financeiras sugeridas e ganhe pontos de experiência para subir de nível e liberar novos badges Banco do Brasil!
                </p>
                
                <div className="quests-progress-container">
                  <div className="level-box">
                    <span className="level-num">{gameState.level}</span>
                    <span className="level-label">Nível</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-labels">
                      <span>Progresso do Nível</span>
                      <span>{gameState.xp} / {gameState.level * 500} XP</span>
                    </div>
                    <div className="xp-bar-track">
                      <div
                        className="xp-bar-fill"
                        style={{
                          width: `${Math.min((gameState.xp / (gameState.level * 500)) * 100, 100)}%`,
                          backgroundColor: profile ? profile.color : 'var(--accent-primary)',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="quests-summary-graphic">
                <Icons.RocketIcon
                  size={64}
                  className="quests-graphic-icon animate-float"
                  style={{ color: profile ? profile.color : 'var(--accent-primary)' }}
                />
              </div>
            </div>

            <div className="dashboard-grid">
              {/* Missões Comportamentais (Coluna Principal) */}
              <div className="dashboard-main-col animate-fade-in-up">
                <section className="quests-section-block glass-card">
                  <h3 className="block-title">
                    <Icons.CheckIcon size={18} className="block-icon" style={{ color: 'var(--accent-primary)' }} />
                    Missões Comportamentais Ativas
                  </h3>
                  <div className="quests-list">
                    
                    {/* Missão de Boas-Vindas (Fixa) */}
                    <div className={`quest-card-item welcome-quest ${completedQuests.quest3 ? 'completed' : ''}`}>
                      <div className="quest-checkbox-wrapper" style={{ cursor: completedQuests.quest3 ? 'default' : 'pointer' }}>
                        <div className={`quest-checkbox ${completedQuests.quest3 ? 'checked' : ''}`}>
                          {completedQuests.quest3 && '✓'}
                        </div>
                      </div>
                      <div className="quest-text-details">
                        <div className="quest-header-row">
                          <span className="quest-badge-xp" style={{ backgroundColor: 'var(--accent-yellow-light)', color: 'var(--accent-yellow-dark)' }}>Boas-Vindas</span>
                          <span className="quest-badge-xp">+150 XP</span>
                          <h4>Diagnóstico Comportamental</h4>
                        </div>
                        <p>Mapeie seus hábitos de consumo respondendo ao teste baseado em psicologia comportamental e finanças pessoais.</p>
                        {completedQuests.quest3 ? (
                          <span className="quest-completed-tag">Missão Realizada ✓</span>
                        ) : (
                          <Link
                            to="/quiz"
                            className="btn-quest-action"
                            style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                          >
                            Realizar Diagnóstico
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Divisor */}
                    <div className="quests-divider" style={{ borderBottom: '1.5px dashed var(--card-border)', margin: 'var(--space-4) 0' }}></div>

                    {/* Seção das Missões Semanais Customizadas por IA */}
                    <div className="weekly-quests-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 style={{ fontWeight: 800, fontSize: 'var(--text-xs)', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                          Missões Semanais da IA
                        </h4>
                        <span className="ia-badge">
                          <span className="ia-badge-dot"></span>
                          IA Ativa
                        </span>
                      </div>
                      <button
                        className="btn-reset-ia"
                        onClick={handleResetWeeklyQuests}
                        disabled={isResetting}
                      >
                        <RefreshIcon size={14} className={isResetting ? 'spin-icon' : ''} />
                        <span>{isResetting ? 'Processando...' : 'Recarregar / Nova Semana'}</span>
                      </button>
                    </div>

                    {weeklyQuests.map((quest) => {
                      const isCompleted = completedWeeklyQuests[quest.id] || false;
                      return (
                        <div key={quest.id} className={`quest-card-item ${isCompleted ? 'completed' : ''}`}>
                          <div className="quest-checkbox-wrapper" onClick={() => handleToggleWeeklyQuest(quest.id, quest.xp)}>
                            <div className={`quest-checkbox ${isCompleted ? 'checked' : ''}`}>
                              {isCompleted && '✓'}
                            </div>
                          </div>
                          <div className="quest-text-details">
                            <div className="quest-header-row">
                              <span className="quest-badge-xp">+{quest.xp} XP</span>
                              <h4>{quest.title}</h4>
                            </div>
                            <p>{quest.desc}</p>
                            <button
                              className="btn-quest-action"
                              onClick={() => handleToggleWeeklyQuest(quest.id, quest.xp)}
                            >
                              {isCompleted ? 'Meta Concluída' : 'Marcar como Concluída'}
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </section>
              </div>

              {/* Conquistas (Badges) (Coluna Sidebar) */}
              <div className="dashboard-sidebar-col animate-fade-in-up delay-1">
                <section className="achievements-section-block glass-card">
                  <h3 className="block-title">
                    <Icons.ShieldIcon size={18} className="block-icon" style={{ color: 'var(--accent-yellow-dark)' }} />
                    Conquistas Financeiras
                  </h3>
                  <div className="achievements-grid">
                    
                    <div className={`achievement-badge-card ${profile ? 'unlocked' : 'locked'}`}>
                      <div className="badge-icon-outer" style={{ borderColor: profile ? profile.color : '' }}>
                        <Icons.ShieldIcon size={24} className="badge-svg" />
                      </div>
                      <h4>Mente Blindada</h4>
                      <p>Mapeou seu perfil comportamental.</p>
                      <span className="badge-status">{profile ? 'Desbloqueado' : 'Bloqueado'}</span>
                    </div>

                    <div className={`achievement-badge-card ${completedWeeklyQuests.quest_cdb ? 'unlocked' : 'locked'}`}>
                      <div className="badge-icon-outer">
                        <Icons.WalletIcon size={24} className="badge-svg" />
                      </div>
                      <h4>Poupador de CDB</h4>
                      <p>Aporte em renda fixa sugerido.</p>
                      <span className="badge-status">{completedWeeklyQuests.quest_cdb ? 'Desbloqueado' : 'Bloqueado'}</span>
                    </div>

                    <div className={`achievement-badge-card ${completedWeeklyQuests.quest_transporte ? 'unlocked' : 'locked'}`}>
                      <div className="badge-icon-outer">
                        <Icons.CreditCardIcon size={24} className="badge-svg" />
                      </div>
                      <h4>Mestre do Controle</h4>
                      <p>Fugiu de gastos de conveniência.</p>
                      <span className="badge-status">{completedWeeklyQuests.quest_transporte ? 'Desbloqueado' : 'Bloqueado'}</span>
                    </div>

                    <div className={`achievement-badge-card ${gameState.level >= 5 ? 'unlocked' : 'locked'}`}>
                      <div className="badge-icon-outer">
                        <Icons.RocketIcon size={24} className="badge-svg" />
                      </div>
                      <h4>Lenda das Finanças</h4>
                      <p>Alcançou o nível 5 no gerenciador.</p>
                      <span className="badge-status">{gameState.level >= 5 ? 'Desbloqueado' : 'Bloqueado'}</span>
                    </div>

                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Aba 3: Meu Perfil Comportamental */}
        {activeTab === 'profile' && (
          <div className="profile-tab-content animate-fade-in">
            {profile ? (
              <div className="profile-wrapper-inner">
                <div className="profile-reveal animate-fade-in-up">
                  <p className="reveal-label">Diagnóstico de Perfil Financeiro Ativo</p>
                </div>

                <ProfileResult profile={profile} />

                <div className="dashboard-grid">
                  {/* Coluna Principal: Radar e Detalhes */}
                  <div className="dashboard-main-col animate-fade-in-up">
                    {/* Radar Chart */}
                    <section className="profile-radar glass-card animate-fade-in-up" id="radar-section">
                      <h3 className="radar-title">Seu Mapa Comportamental</h3>
                      <div className="radar-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                            <PolarGrid stroke="#cbd5e1" gridType="polygon" />
                            <PolarAngleAxis
                              dataKey="subject"
                              tick={{
                                fill: 'var(--text-primary)',
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
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

                    {/* Pontos Fortes e Pontos de Atenção */}
                    <div className="profile-details">
                      <section className="detail-section glass-card animate-fade-in-up" id="strengths-section">
                        <h3 className="detail-title">
                          <Icons.CheckIcon size={18} className="detail-icon" style={{ color: 'var(--accent-success)', marginRight: '8px' }} />
                          Pontos Fortes
                        </h3>
                        <ul className="detail-list">
                          {profile.strengths.map((s, i) => (
                            <li key={i} className="detail-item success">
                              <span className="item-dot" style={{ backgroundColor: 'var(--accent-success)' }}></span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="detail-section glass-card animate-fade-in-up" id="watchpoints-section">
                        <h3 className="detail-title">
                          <Icons.AlertCircleIcon size={18} className="detail-icon" style={{ color: 'var(--accent-warning-dark)', marginRight: '8px' }} />
                          Pontos de Atenção
                        </h3>
                        <ul className="detail-list">
                          {profile.watchPoints.map((w, i) => (
                            <li key={i} className="detail-item warning">
                              <span className="item-dot" style={{ backgroundColor: 'var(--accent-warning-dark)' }}></span>
                              {w}
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>

                  {/* Coluna Sidebar: Diretrizes da IA */}
                  <div className="dashboard-sidebar-col animate-fade-in-up delay-1">
                    <section className="nudge-section glass-card animate-fade-in-up" id="nudge-section">
                      <h3 className="nudge-title">
                        <Icons.InfoIcon size={18} className="detail-icon" style={{ color: 'var(--accent-primary)', marginRight: '8px' }} />
                        Diretrizes e Recomendações
                      </h3>
                      <p className="nudge-text">{profile.nudgeStrategy}</p>
                      <div className="nudge-meta-box" style={{ borderLeftColor: profile.color, background: profile.bgGlow }}>
                        <strong>Estratégia Comportamental BB:</strong> Notificações preventivas inteligentes configuradas sob medida para o perfil {profile.name}.
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-profile-locked glass-card animate-fade-in">
                <Icons.ShieldIcon size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
                <h3>Perfil Comportamental Bloqueado</h3>
                <p>
                  Você ainda não realizou o mapeamento psicográfico. Conclua o teste para entender qual perfil comportamental rege suas decisões financeiras diárias.
                </p>
                <Link to="/quiz" className="btn-primary" style={{ marginTop: '16px' }}>
                  <span>Fazer o Quiz Comportamental</span>
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal de Celebração de Perfil Desbloqueado */}
      {showCelebration && profile && (
        <div className="celebration-overlay">
          <div className="celebration-modal glass-card animate-scale-in" style={{ borderColor: profile.color }}>
            <div className="celebration-header">
              <Icons.RocketIcon size={40} className="celebration-icon animate-float" style={{ color: profile.color }} />
              <h2>Diagnóstico Concluído!</h2>
            </div>
            
            <p className="celebration-intro">Lucas, você desbloqueou seu arquétipo comportamental:</p>
            
            <div className="celebration-profile-card" style={{ background: profile.bgGlow || 'rgba(0, 0, 0, 0.02)' }}>
              <div className="celebration-profile-avatar" style={{ backgroundColor: profile.color }}>
                {ProfileIconComponent && <ProfileIconComponent size={28} style={{ color: '#fff' }} />}
              </div>
              <h3 style={{ color: profile.color }}>Perfil {profile.name}</h3>
              <p className="celebration-desc">{profile.description}</p>
            </div>

            <div className="celebration-xp-award">
              <span className="xp-badge">+150 XP</span>
              <p>Recompensa de diagnóstico inicial adicionada ao seu nível atual!</p>
            </div>

            <button
              className="btn-primary btn-celebration"
              onClick={() => {
                setShowCelebration(false);
                setActiveTab('quests'); // Direcionar à aba de missões para ver a evolução
              }}
              style={{
                backgroundColor: profile.color,
                borderColor: profile.color,
                color: '#fff',
                boxShadow: `2px 2px 0px rgba(0, 0, 0, 0.15)`
              }}
            >
              <span>Acessar Painel & Missões</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast flutuante de LEVEL UP! */}
      {gameState.justLeveledUp && (
        <div className="level-up-toast animate-scale-in">
          <div className="level-up-toast-inner">
            <Icons.RocketIcon size={28} className="level-up-icon animate-float" style={{ color: 'var(--accent-yellow)' }} />
            <div className="level-up-text">
              <h4>NÍVEL UP!</h4>
              <p>Você subiu para o <strong>Nível {gameState.level}</strong>!</p>
            </div>
            <button onClick={clearLevelUpNotification} className="btn-close-toast" aria-label="Fechar">
              ✓
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
