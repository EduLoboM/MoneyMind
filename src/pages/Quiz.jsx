import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import quizQuestions from '../data/quizQuestions';
import profiles from '../data/profiles';
import './Quiz.css';

export default function Quiz({ onProfileResult }) {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [slideDir, setSlideDir] = useState('right');

  const totalQuestions = quizQuestions.length;
  const progress = ((currentQ + 1) / totalQuestions) * 100;

  function handleSelect(optionIndex) {
    setSelectedOptions((prev) => ({ ...prev, [currentQ]: optionIndex }));

    // Auto-advance after selection with delay
    setTimeout(() => {
      if (currentQ < totalQuestions - 1) {
        setSlideDir('right');
        setCurrentQ((prev) => prev + 1);
      } else {
        finishQuiz({ ...selectedOptions, [currentQ]: optionIndex });
      }
    }, 600);
  }

  function handleBack() {
    if (currentQ > 0) {
      setSlideDir('left');
      setCurrentQ((prev) => prev - 1);
    }
  }

  function finishQuiz(answers) {
    setIsAnalyzing(true);

    // Calculate scores
    const scores = { guardiao: 0, desbravador: 0, impulsivo: 0, equilibrista: 0 };
    Object.entries(answers).forEach(([qIndex, optIndex]) => {
      const question = quizQuestions[parseInt(qIndex)];
      const option = question.options[optIndex];
      Object.entries(option.scores).forEach(([profile, score]) => {
        scores[profile] += score;
      });
    });

    // Find winning profile
    const winnerId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const winnerProfile = profiles[winnerId];

    // Simulate AI analysis time
    setTimeout(() => {
      onProfileResult(winnerProfile);
      navigate('/dashboard', {
        state: {
          justCompletedQuiz: true,
          unlockedProfile: winnerProfile,
        },
      });
    }, 2500);
  }


  if (isAnalyzing) {
    return (
      <div className="page-wrapper quiz-page" id="quiz-page">
        <div className="container">
          <div className="analyzing-screen">
            <div className="analyzing-loader">
              <div className="loader-progress-bar">
                <div className="loader-progress-fill"></div>
              </div>
            </div>
            <h2 className="analyzing-title">Analisando Perfil Comportamental</h2>
            <p className="analyzing-subtitle">
              Processando suas respostas no modelo psicográfico e mapeando padrões financeiros...
            </p>
            <div className="analyzing-steps">
              <div className="analyze-step active">
                <span className="step-check">✓</span> Respostas mapeadas
              </div>
              <div className="analyze-step active delay-1">
                <span className="step-check">✓</span> Padrões psicográficos validados
              </div>
              <div className="analyze-step active delay-2">
                <span className="step-spinner">⟳</span> Classificando tipo de comportamento...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div className="page-wrapper quiz-page" id="quiz-page">
      <div className="container">
        {/* Progress */}
        <div className="quiz-progress" id="quiz-progress">
          <div className="progress-info">
            <span className="progress-label">
              Pergunta {currentQ + 1} de {totalQuestions}
            </span>
            <span className="progress-percent">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div
          className={`quiz-question-wrapper ${slideDir === 'right' ? 'slide-in-right' : 'slide-in-left'}`}
          key={currentQ}
        >
          <QuizCard
            question={question}
            options={question.options}
            selectedIndex={selectedOptions[currentQ] ?? null}
            onSelect={handleSelect}
          />
        </div>

        {/* Navigation */}
        <div className="quiz-nav">
          <button
            className="btn-secondary quiz-back"
            onClick={handleBack}
            disabled={currentQ === 0}
            id="quiz-back-btn"
          >
            ← Voltar
          </button>
          <div className="quiz-dots">
            {quizQuestions.map((_, i) => (
              <span
                key={i}
                className={`quiz-dot ${i === currentQ ? 'active' : ''} ${
                  selectedOptions[i] !== undefined ? 'answered' : ''
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
