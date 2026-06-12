import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from '../components/Icons';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper landing-page" id="landing-page">
      <div className="container">
        
        {/* Split Hero Section */}
        <section className="hero-split" id="hero-section">
          {/* Hero Left: Text & CTA */}
          <div className="hero-left-content animate-fade-in-up">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Hackathon BB — Inteligência Analítica e Comportamental
            </div>

            <h1 className="hero-title">
              O app que avisa quando <br />
              seu dinheiro vai acabar. <br />
              <span className="accent-color">Antes de acontecer.</span>
            </h1>

            <p className="hero-subtitle">
              O MoneyMind cruza seu histórico de gastos com psicologia comportamental para projetar seu saldo com <strong>15 dias de antecedência</strong>. Evite sustos com previsões automáticas de fluxo de caixa.
            </p>

            <div className="hero-cta">
              <button
                className="btn-primary btn-hero"
                onClick={() => navigate('/quiz')}
                id="cta-discover-profile"
              >
                <span>Mapear Meu Perfil</span>
              </button>
              <button
                className="btn-secondary btn-demo"
                onClick={() => navigate('/dashboard')}
                id="cta-see-dashboard"
              >
                Ver Dashboard Demo
              </button>
            </div>
          </div>

          {/* Hero Right: Interactive Product Mockup */}
          <div className="hero-right-mockup animate-scale-in delay-1">
            <div className="product-mockup-window">
              <div className="mockup-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mockup-tab-title">MONEYMIND ANALYTICS</div>
              </div>
              <div className="mockup-body">
                {/* Mini Metric */}
                <div className="mockup-metric-box">
                  <div className="mockup-metric-header">
                    <Icons.CalendarIcon size={14} className="icon-blue" />
                    <span>Risco de Saldo Negativo</span>
                  </div>
                  <div className="mockup-metric-value">Previsto em 7 dias</div>
                  <div className="mockup-progress-track">
                    <div className="mockup-progress-fill" style={{ width: '80%', background: 'var(--accent-danger)' }}></div>
                  </div>
                </div>

                {/* Mini Table Title */}
                <div className="mockup-table-title">Extrato Comportamental Recente</div>

                {/* Mini Table Rows */}
                <div className="mockup-table-list">
                  <div className="mockup-tx-row">
                    <div className="tx-details">
                      <span className="tx-name">Compra Skin Fortnite</span>
                      <span className="tx-date">08/06</span>
                    </div>
                    <div className="tx-meta">
                      <span className="tx-price">R$ 79,90</span>
                      <span className="tx-tag tag-orange">Compra Espontânea</span>
                    </div>
                  </div>

                  <div className="mockup-tx-row">
                    <div className="tx-details">
                      <span className="tx-name">Uber Corrida Curta Trabalho</span>
                      <span className="tx-date">07/06</span>
                    </div>
                    <div className="tx-meta">
                      <span className="tx-price">R$ 34,90</span>
                      <span className="tx-tag tag-red">Conveniência</span>
                    </div>
                  </div>

                  <div className="mockup-tx-row">
                    <div className="tx-details">
                      <span className="tx-name">Refeição Executiva Diária</span>
                      <span className="tx-date">06/06</span>
                    </div>
                    <div className="tx-meta">
                      <span className="tx-price">R$ 32,00</span>
                      <span className="tx-tag tag-green">Custo Essencial</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features Section */}
        <section className="features-section" id="features-section">
          <h2 className="section-title animate-fade-in-up">
            Tecnologia BB para <span className="accent-color">Suas Finanças Pessoais</span>
          </h2>
          
          <div className="bento-grid">
            {/* Bento 1: Large - Psicográfico */}
            <div className="bento-item bento-large animate-fade-in-up delay-1">
              <div className="bento-icon icon-blue">
                <Icons.ShieldIcon size={24} />
              </div>
              <h3 className="bento-heading">Descubra seu perfil de gastos</h3>
              <p className="bento-desc">
                Faça o teste comportamental baseado em psicologia financeira e entenda qual perfil (Guardião, Desbravador, Impulsivo ou Equilibrista) guia suas escolhas financeiras no dia a dia.
              </p>
              <div className="bento-preview-profiles">
                <span className="profile-label-badge"><Icons.ShieldIcon size={12} /> Guardião</span>
                <span className="profile-label-badge"><Icons.RocketIcon size={12} /> Desbravador</span>
                <span className="profile-label-badge"><Icons.FlashIcon size={12} /> Impulsivo</span>
                <span className="profile-label-badge"><Icons.ScaleIcon size={12} /> Equilibrista</span>
              </div>
            </div>

            {/* Bento 2: Medium - Previsão */}
            <div className="bento-item bento-medium animate-fade-in-up delay-2">
              <div className="bento-icon icon-red">
                <Icons.CalendarIcon size={24} />
              </div>
              <h3 className="bento-heading">Previsão para 15 dias</h3>
              <p className="bento-desc">
                Projetamos seu saldo futuro com base no ritmo das suas despesas fixas e variáveis, ajudando a evitar surpresas antes que o mês termine.
              </p>
            </div>

            {/* Bento 3: Small - Nudges */}
            <div className="bento-item bento-small animate-fade-in-up delay-3">
              <div className="bento-icon icon-yellow">
                <Icons.InfoIcon size={24} />
              </div>
              <h3 className="bento-heading">Alertas de comportamento</h3>
              <p className="bento-desc">
                Notificações discretas na hora certa para lembrar você de alternativas mais econômicas quando identificar uma tendência de estouro.
              </p>
            </div>

            {/* Bento 4: Large - CDB Jovem */}
            <div className="bento-item bento-large animate-fade-in-up delay-4">
              <div className="bento-icon icon-green">
                <Icons.WalletIcon size={24} />
              </div>
              <h3 className="bento-heading">Investimento automático</h3>
              <p className="bento-desc">
                Identificou uma sobra no caixa ou recebeu uma receita extra? Aplique diretamente no CDB com Liquidez Diária do BB com apenas um clique.
              </p>
              <div className="bento-preview-investment">
                <div className="investment-header-mock">CDB Liquidez Diária BB</div>
                <div className="investment-values-mock">
                  <span>Saldo investido</span>
                  <strong>+ R$ 800,00</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
