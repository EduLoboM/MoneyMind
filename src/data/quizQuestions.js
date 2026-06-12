// MoneyMind — Quiz Psicográfico Financeiro
// 8 perguntas cenário-based com pontuação ponderada para cada perfil.
// Cada opção distribui pontos entre os 4 perfis.

const quizQuestions = [
  {
    id: 1,
    question: 'Seu carro quebrou e o conserto custa R$2.000. O que você faz?',
    options: [
      {
        text: 'Uso minha reserva de emergência sem pensar duas vezes',
        scores: { guardiao: 3, desbravador: 0, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Pesquiso alternativas mais baratas e negocio o preço',
        scores: { guardiao: 1, desbravador: 0, impulsivo: 0, equilibrista: 3 },
      },
      {
        text: 'Parcelo no cartão e resolvo depois',
        scores: { guardiao: 0, desbravador: 0, impulsivo: 3, equilibrista: 0 },
      },
      {
        text: 'Vejo isso como chance de trocar para um carro melhor',
        scores: { guardiao: 0, desbravador: 3, impulsivo: 1, equilibrista: 0 },
      },
    ],
  },
  {
    id: 2,
    question: 'Quando sobra dinheiro no fim do mês, você geralmente...',
    options: [
      {
        text: 'Guardo tudo na poupança ou conta reserva',
        scores: { guardiao: 3, desbravador: 0, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Invisto em algo que possa render mais',
        scores: { guardiao: 0, desbravador: 3, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Aproveito para comprar algo que estou querendo',
        scores: { guardiao: 0, desbravador: 0, impulsivo: 3, equilibrista: 0 },
      },
      {
        text: 'Divido: uma parte para guardar, outra para curtir',
        scores: { guardiao: 1, desbravador: 1, impulsivo: 0, equilibrista: 3 },
      },
    ],
  },
  {
    id: 3,
    question: 'Você vê uma promoção de 70% off em algo que não precisa agora. O que faz?',
    options: [
      {
        text: 'Ignoro completamente — se não preciso, não compro',
        scores: { guardiao: 3, desbravador: 0, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Analiso se pode ser um bom investimento para revender',
        scores: { guardiao: 0, desbravador: 3, impulsivo: 0, equilibrista: 0 },
      },
      {
        text: 'Compro na hora antes que acabe!',
        scores: { guardiao: 0, desbravador: 0, impulsivo: 3, equilibrista: 0 },
      },
      {
        text: 'Coloco na lista de desejos e penso por alguns dias',
        scores: { guardiao: 1, desbravador: 0, impulsivo: 0, equilibrista: 3 },
      },
    ],
  },
  {
    id: 4,
    question: 'Um amigo sugere um investimento que pode dobrar seu dinheiro em 6 meses, mas com risco alto. Você...',
    options: [
      {
        text: 'Recuso na hora — prefiro segurança a risco',
        scores: { guardiao: 3, desbravador: 0, impulsivo: 0, equilibrista: 0 },
      },
      {
        text: 'Topo! Coloco uma parte significativa',
        scores: { guardiao: 0, desbravador: 3, impulsivo: 1, equilibrista: 0 },
      },
      {
        text: 'Entro de cabeça sem pensar muito — FOMO!',
        scores: { guardiao: 0, desbravador: 1, impulsivo: 3, equilibrista: 0 },
      },
      {
        text: 'Pesquiso bastante e invisto só o que posso perder',
        scores: { guardiao: 1, desbravador: 1, impulsivo: 0, equilibrista: 3 },
      },
    ],
  },
  {
    id: 5,
    question: 'Como você organiza suas contas do mês?',
    options: [
      {
        text: 'Planilha detalhada com cada centavo rastreado',
        scores: { guardiao: 3, desbravador: 0, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Foco nos investimentos, o resto se resolve',
        scores: { guardiao: 0, desbravador: 3, impulsivo: 0, equilibrista: 0 },
      },
      {
        text: 'Não organizo muito... vou vendo conforme gasto',
        scores: { guardiao: 0, desbravador: 0, impulsivo: 3, equilibrista: 0 },
      },
      {
        text: 'Tenho um orçamento flexível que ajusto todo mês',
        scores: { guardiao: 1, desbravador: 0, impulsivo: 0, equilibrista: 3 },
      },
    ],
  },
  {
    id: 6,
    question: 'Você percebe que gastou mais do que ganhou este mês. Sua primeira reação é...',
    options: [
      {
        text: 'Fico muito ansioso e corto gastos imediatamente',
        scores: { guardiao: 3, desbravador: 0, impulsivo: 0, equilibrista: 0 },
      },
      {
        text: 'Busco uma fonte extra de renda para cobrir',
        scores: { guardiao: 0, desbravador: 3, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Penso "mês que vem eu resolvo" e sigo em frente',
        scores: { guardiao: 0, desbravador: 0, impulsivo: 3, equilibrista: 0 },
      },
      {
        text: 'Reviso meus gastos, identifico o problema e ajusto',
        scores: { guardiao: 1, desbravador: 0, impulsivo: 0, equilibrista: 3 },
      },
    ],
  },
  {
    id: 7,
    question: 'Seus amigos estão todos comprando o último iPhone. Você...',
    options: [
      {
        text: 'Fico com meu celular atual — funciona bem',
        scores: { guardiao: 3, desbravador: 0, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Pesquiso se existe uma alternativa melhor e mais barata',
        scores: { guardiao: 0, desbravador: 2, impulsivo: 0, equilibrista: 3 },
      },
      {
        text: 'Compro também — não quero ficar de fora!',
        scores: { guardiao: 0, desbravador: 0, impulsivo: 3, equilibrista: 0 },
      },
      {
        text: 'Analiso se posso e se vale a pena, depois decido',
        scores: { guardiao: 1, desbravador: 1, impulsivo: 0, equilibrista: 2 },
      },
    ],
  },
  {
    id: 8,
    question: 'Se pudesse escolher, qual meta financeira priorizaria agora?',
    options: [
      {
        text: 'Ter 12 meses de reserva de emergência',
        scores: { guardiao: 3, desbravador: 0, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Montar uma carteira de investimentos diversificada',
        scores: { guardiao: 0, desbravador: 3, impulsivo: 0, equilibrista: 1 },
      },
      {
        text: 'Realizar um sonho grande (viagem, carro, etc.)',
        scores: { guardiao: 0, desbravador: 0, impulsivo: 3, equilibrista: 0 },
      },
      {
        text: 'Equilibrar todas as áreas: emergência, lazer e futuro',
        scores: { guardiao: 1, desbravador: 1, impulsivo: 0, equilibrista: 3 },
      },
    ],
  },
];

export default quizQuestions;
