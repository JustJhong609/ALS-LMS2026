import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonIcon,
  IonRippleEffect, IonButton, IonProgressBar, IonAlert,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { chevronBack, timerOutline, checkmarkCircle, closeCircle } from 'ionicons/icons';
import './AssessmentQuiz.css';

type Option = { key: string; text: string };
type Question = { id: number; question: string; options: Option[]; correct: string; explanation: string };

const QUIZZES: Record<string, { title: string; subject: string; color: string; timeLimit: number; questions: Question[] }> = {
  q1: {
    title:     'Fractions Quiz',
    subject:   'Mathematics',
    color:     '#7c3aed',
    timeLimit: 300, // seconds
    questions: [
      { id: 1, question: 'What is ½ + ¼?', options: [{ key: 'A', text: '¾' }, { key: 'B', text: '⅔' }, { key: 'C', text: '1' }, { key: 'D', text: '½' }], correct: 'A', explanation: '½ = 2/4, so 2/4 + 1/4 = 3/4 = ¾' },
      { id: 2, question: 'Which fraction is larger: ⅔ or ¾?', options: [{ key: 'A', text: '⅔' }, { key: 'B', text: '¾' }, { key: 'C', text: 'They are equal' }, { key: 'D', text: 'Cannot be compared' }], correct: 'B', explanation: '¾ = 0.75, ⅔ ≈ 0.667, so ¾ is larger.' },
      { id: 3, question: 'What is ⅔ of 12?', options: [{ key: 'A', text: '6' }, { key: 'B', text: '8' }, { key: 'C', text: '9' }, { key: 'D', text: '10' }], correct: 'B', explanation: '12 ÷ 3 = 4, 4 × 2 = 8' },
      { id: 4, question: 'Simplify 6/8:', options: [{ key: 'A', text: '⅔' }, { key: 'B', text: '¾' }, { key: 'C', text: '⅗' }, { key: 'D', text: '½' }], correct: 'B', explanation: 'GCD(6,8) = 2, so 6/8 = 3/4 = ¾' },
      { id: 5, question: 'If a pizza has 8 slices and you eat 3, what fraction is left?', options: [{ key: 'A', text: '⅜' }, { key: 'B', text: '⅝' }, { key: 'C', text: '½' }, { key: 'D', text: '¾' }], correct: 'B', explanation: '8 - 3 = 5 slices left, 5/8 = ⅝' },
    ],
  },
  q2: {
    title:     'Unit 2 Assessment',
    subject:   'Science',
    color:     '#d97706',
    timeLimit: 600,
    questions: [
      { id: 1, question: 'What is the basic unit of life?', options: [{ key: 'A', text: 'Atom' }, { key: 'B', text: 'Cell' }, { key: 'C', text: 'Molecule' }, { key: 'D', text: 'Tissue' }], correct: 'B', explanation: 'The cell is the fundamental unit of life in all living organisms.' },
      { id: 2, question: 'Which gas do plants absorb during photosynthesis?', options: [{ key: 'A', text: 'Oxygen' }, { key: 'B', text: 'Nitrogen' }, { key: 'C', text: 'Carbon Dioxide' }, { key: 'D', text: 'Hydrogen' }], correct: 'C', explanation: 'Plants absorb CO₂ and release O₂ during photosynthesis.' },
      { id: 3, question: 'The Earth revolves around the Sun in approximately:', options: [{ key: 'A', text: '30 days' }, { key: 'B', text: '180 days' }, { key: 'C', text: '365 days' }, { key: 'D', text: '400 days' }], correct: 'C', explanation: 'Earth takes approximately 365.25 days (1 year) to orbit the Sun.' },
    ],
  },
};

const DEFAULT_QUIZ = QUIZZES['q1'];

const AssessmentQuiz: React.FC = () => {
  const history = useHistory();
  const { id }  = useParams<{ id: string }>();
  const quiz    = QUIZZES[id] ?? DEFAULT_QUIZ;

  const [started,  setStarted]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [answers,  setAnswers]  = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(t); setFinished(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, finished]);

  const q = quiz.questions[current];
  const selected = answers[q?.id];
  const isCorrect = selected === q?.correct;

  const handleAnswer = (key: string) => {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [q.id]: key }));
    setRevealed(true);
  };

  const next = () => {
    setRevealed(false);
    if (current + 1 < quiz.questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  const score = quiz.questions.reduce((s, question) => s + (answers[question.id] === question.correct ? 1 : 0), 0);
  const pct   = Math.round((score / quiz.questions.length) * 100);
  const passed = pct >= 75;

  const formatTime = (secs: number) => `${Math.floor(secs / 60).toString().padStart(2, '0')}:${(secs % 60).toString().padStart(2, '0')}`;

  // ── Finished screen ──
  if (finished) {
    return (
      <IonPage>
        <IonContent className="quiz-content">
          <div className="quiz-result-screen">
            <div className="result-circle" style={{ borderColor: passed ? '#16a34a' : '#dc2626' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: passed ? '#16a34a' : '#dc2626' }}>{pct}%</span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>{score}/{quiz.questions.length}</span>
            </div>
            <h2 className="result-title" style={{ color: passed ? '#16a34a' : '#dc2626' }}>
              {passed ? '🎉 Congratulations!' : '😔 Keep Trying!'}
            </h2>
            <p className="result-sub">
              {passed
                ? `You passed the ${quiz.title} with ${pct}%. Excellent work!`
                : `You scored ${pct}% on the ${quiz.title}. Review the lessons and try again.`}
            </p>

            <div className="result-breakdown">
              {quiz.questions.map((question) => (
                <div key={question.id} className="result-row">
                  <IonIcon icon={answers[question.id] === question.correct ? checkmarkCircle : closeCircle}
                    style={{ color: answers[question.id] === question.correct ? '#16a34a' : '#dc2626', fontSize: 20, flexShrink: 0 }} />
                  <p className="result-q-text">{question.question}</p>
                </div>
              ))}
            </div>

            <div className="result-btns">
              <IonButton expand="block" className="result-btn-primary" onClick={() => history.goBack()}>
                Back to Assessments
              </IonButton>
              {!passed && (
                <IonButton expand="block" fill="outline" className="result-btn-retry"
                  onClick={() => { setFinished(false); setStarted(false); setCurrent(0); setAnswers({}); setTimeLeft(quiz.timeLimit); }}>
                  Retry Quiz
                </IonButton>
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // ── Start screen ──
  if (!started) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar style={{ '--background': quiz.color }}>
            <button className="quiz-back ion-activatable" onClick={() => history.goBack()}>
              <IonRippleEffect />
              <IonIcon icon={chevronBack} style={{ color: '#fff', fontSize: 22 }} />
            </button>
          </IonToolbar>
        </IonHeader>
        <IonContent className="quiz-content">
          <div className="quiz-start-screen">
            <div className="quiz-icon" style={{ background: quiz.color + '18' }}>📝</div>
            <h2 className="quiz-start-title">{quiz.title}</h2>
            <p className="quiz-start-subject">{quiz.subject}</p>

            <div className="quiz-info-grid">
              <div className="qi-card"><span className="qi-num">{quiz.questions.length}</span><span className="qi-lbl">Questions</span></div>
              <div className="qi-card"><span className="qi-num">{formatTime(quiz.timeLimit)}</span><span className="qi-lbl">Time Limit</span></div>
              <div className="qi-card"><span className="qi-num">75%</span><span className="qi-lbl">To Pass</span></div>
            </div>

            <div className="quiz-instructions">
              <p className="qi-title">Instructions</p>
              <ul>
                <li>Read each question carefully.</li>
                <li>Select the best answer from the choices.</li>
                <li>You will see the correct answer after each question.</li>
                <li>The quiz ends when time runs out or all questions are answered.</li>
              </ul>
            </div>

            <IonButton expand="block" className="quiz-start-btn" style={{ '--btn-bg': quiz.color } as React.CSSProperties} onClick={() => setStarted(true)}>
              🚀 Start Quiz
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // ── Active quiz ──
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': quiz.color }}>
          <div className="quiz-active-toolbar">
            <button className="quiz-back ion-activatable" onClick={() => setShowExit(true)}>
              <IonRippleEffect />
              <IonIcon icon={chevronBack} style={{ color: '#fff', fontSize: 22 }} />
            </button>
            <div className="quiz-progress-txt">
              {current + 1} / {quiz.questions.length}
            </div>
            <div className="quiz-timer" style={{ color: timeLeft < 60 ? '#fbbf24' : '#fff' }}>
              <IonIcon icon={timerOutline} /> {formatTime(timeLeft)}
            </div>
          </div>
        </IonToolbar>
        <IonProgressBar value={(current + 1) / quiz.questions.length} style={{ '--background': quiz.color + '40', '--progress-background': '#fbbf24' }} />
      </IonHeader>

      <IonContent className="quiz-content">
        <div className="quiz-body">
          <p className="q-num">Question {current + 1}</p>
          <h2 className="q-text">{q.question}</h2>

          <div className="options-list">
            {q.options.map((opt) => {
              let cls = 'option-item ion-activatable';
              if (revealed) {
                if (opt.key === q.correct) cls += ' correct';
                else if (opt.key === selected) cls += ' wrong';
                else cls += ' faded';
              } else if (opt.key === selected) {
                cls += ' selected';
              }
              return (
                <div key={opt.key} className={cls} style={{ '--opt-color': quiz.color } as React.CSSProperties} onClick={() => handleAnswer(opt.key)}>
                  <IonRippleEffect />
                  <div className="opt-key">{opt.key}</div>
                  <p className="opt-text">{opt.text}</p>
                  {revealed && opt.key === q.correct && <IonIcon icon={checkmarkCircle} className="opt-icon correct-icon" />}
                  {revealed && opt.key === selected && opt.key !== q.correct && <IonIcon icon={closeCircle} className="opt-icon wrong-icon" />}
                </div>
              );
            })}
          </div>

          {revealed && (
            <div className="explanation-box" style={{ borderColor: isCorrect ? '#16a34a' : '#dc2626' }}>
              <p className="exp-label">{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
              <p className="exp-text">{q.explanation}</p>
            </div>
          )}

          {revealed && (
            <IonButton expand="block" className="next-q-btn" onClick={next}>
              {current + 1 < quiz.questions.length ? 'Next Question →' : 'Submit Quiz 🏁'}
            </IonButton>
          )}
        </div>
      </IonContent>

      <IonAlert
        isOpen={showExit}
        header="Exit Quiz?"
        message="Your progress will be lost if you exit now."
        buttons={[
          { text: 'Stay', role: 'cancel' },
          { text: 'Exit', role: 'destructive', handler: () => history.goBack() },
        ]}
        onDidDismiss={() => setShowExit(false)}
      />
    </IonPage>
  );
};

export default AssessmentQuiz;
