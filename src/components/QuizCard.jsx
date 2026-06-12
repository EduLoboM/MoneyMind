import './QuizCard.css';

export default function QuizCard({ question, options, selectedIndex, onSelect }) {
  return (
    <div className="quiz-card animate-fade-in-up" id={`quiz-card-${question.id}`}>
      <div className="quiz-card-badge">Questão 0{question.id}</div>
      <h2 className="quiz-card-question">{question.question}</h2>
      <div className="quiz-card-options">
        {options.map((option, i) => (
          <button
            key={i}
            className={`quiz-option ${selectedIndex === i ? 'selected' : ''}`}
            onClick={() => onSelect(i)}
            id={`quiz-option-${question.id}-${i}`}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <span className="option-text">{option.text}</span>
            {selectedIndex === i && <span className="option-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
