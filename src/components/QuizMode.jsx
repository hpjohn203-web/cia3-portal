import { useState, useEffect, useCallback } from 'react';
import questions from '../data/questions.json';
import { useProgress } from '../hooks/useProgress';

const TOPICS = ['All', ...Array.from(new Set(questions.map(q => q.topic))).sort()];
const QUIZ_SIZES = [10, 20, 30, 50];

export default function QuizMode({ onNavigate }) {
  const { recordAnswer, saveSession, addToErrorLog, toggleBookmark, isBookmarked } = useProgress();
  const [phase, setPhase] = useState('setup');
  const [topicFilter, setTopicFilter] = useState('All');
  const [quizSize, setQuizSize] = useState(20);
  const [timerOn, setTimerOn] = useState(true);
  const [timePerQ, setTimePerQ] = useState(90);
  const [quiz, setQuiz] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showExplain, setShowExplain] = useState(false);

  const currentQ = quiz[qIndex];
  const isAnswered = selected !== null;

  useEffect(() => {
    if (phase !== 'quiz' || !timerOn || isAnswered) return;
    setTimeLeft(timePerQ);
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); handleSelect(null); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, qIndex, timerOn]);

  function startQuiz() {
    let pool = topicFilter === 'All' ? questions : questions.filter(q => q.topic === topicFilter);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, quizSize);
    setQuiz(shuffled); setQIndex(0); setSelected(null); setAnswers([]); setShowExplain(false); setPhase('quiz');
  }

  const handleSelect = useCallback((letter) => {
    if (isAnswered) return;
    setSelected(letter);
    const correct = letter === currentQ?.answer;
    if (currentQ) {
      recordAnswer(currentQ.id, correct);
      if (!correct) addToErrorLog(currentQ, letter);
    }
    setAnswers(prev => [...prev, { questionId: currentQ?.id, selected: letter, correct, question: currentQ }]);
  }, [isAnswered, currentQ, recordAnswer, addToErrorLog]);

  function handleNext() {
    if (qIndex + 1 >= quiz.length) {
      const finalScore = answers.filter(a => a.correct).length;
      const questionResults = answers.map(a => ({
        id: a.question?.id, question: a.question?.question, topic: a.question?.topic,
        answer: a.question?.answer, correctText: a.question?.options?.['ABCD'.indexOf(a.question?.answer)],
        selected: a.selected, correct: a.correct,
      }));
      saveSession(finalScore, quiz.length, topicFilter, questionResults);
      setPhase('review');
    } else {
      setQIndex(i => i + 1); setSelected(null); setShowExplain(false);
    }
  }

  if (phase === 'setup') return <SetupScreen topicFilter={topicFilter} setTopicFilter={setTopicFilter} quizSize={quizSize} setQuizSize={setQuizSize} timerOn={timerOn} setTimerOn={setTimerOn} timePerQ={timePerQ} setTimePerQ={setTimePerQ} onStart={startQuiz} onBack={() => onNavigate('home')} topics={TOPICS} />;
  if (phase === 'review') return <ReviewScreen quiz={quiz} answers={answers} onRetry={startQuiz} onHome={() => onNavigate('home')} onResults={() => onNavigate('results')} onErrorLog={() => onNavigate('errorlog')} />;
  if (!currentQ) return null;

  const timerPct = timerOn ? (timeLeft / timePerQ) * 100 : 100;
  const timerColor = timeLeft <= 15 ? 'bg-red-400' : timeLeft <= 30 ? 'bg-amber-400' : 'bg-emerald-400';
  const bookmarked = isBookmarked(currentQ.id);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen flex flex-col max-w-2xl mx-auto">
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => { if (confirm('Quit quiz?')) setPhase('setup'); }} className="text-slate-400 hover:text-slate-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <span className="font-semibold">{qIndex + 1} / {quiz.length}</span>
          <div className="flex items-center gap-3">
            {timerOn && <span className={`text-sm font-mono font-bold ${timeLeft <= 15 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>{String(Math.floor(timeLeft / 60)).padStart(2,'0')}:{String(timeLeft % 60).padStart(2,'0')}</span>}
            <button onClick={() => toggleBookmark(currentQ.id)} className={`text-lg transition-transform active:scale-90 ${bookmarked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}>🔖</button>
          </div>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(qIndex / quiz.length) * 100}%` }} />
        </div>
        {timerOn && <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-1"><div className={`h-full ${timerColor} rounded-full transition-all`} style={{ width: `${timerPct}%` }} /></div>}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">{currentQ.topic}</span>
        <p className="text-sm leading-relaxed mb-6 mt-1">{currentQ.question}</p>
        <div className="space-y-3">
          {currentQ.options.map((opt, i) => {
            const letter = 'ABCD'[i];
            const isCorrect = letter === currentQ.answer;
            const isSelected = letter === selected;
            let cls = 'bg-slate-800 border border-slate-700 text-slate-200';
            if (isAnswered) {
              if (isCorrect) cls = 'bg-emerald-500/20 border border-emerald-500 text-emerald-300';
              else if (isSelected) cls = 'bg-red-500/20 border border-red-500 text-red-300';
              else cls = 'bg-slate-800 border border-slate-700 text-slate-400';
            }
            return (
              <button key={letter} onClick={() => handleSelect(letter)} disabled={isAnswered}
                className={`w-full text-left rounded-2xl px-4 py-3.5 transition-all active:scale-[0.98] ${cls}`}>
                <div className="flex items-start gap-3">
                  <span className={`font-bold text-sm shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${isAnswered && isCorrect ? 'bg-emerald-500 text-white' : isAnswered && isSelected ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}`}>{letter}</span>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <div className="mt-4">
            <button onClick={() => setShowExplain(e => !e)} className="text-xs text-amber-400 underline mb-2">{showExplain ? 'Hide' : 'Show'} explanation</button>
            {showExplain && <div className="bg-slate-800 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</div>}
          </div>
        )}
      </div>

      {isAnswered && (
        <div className="px-4 pb-6 pt-2">
          <button onClick={handleNext} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-2xl transition-colors active:scale-95">
            {qIndex + 1 >= quiz.length ? 'See Results →' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  );
}

function SetupScreen({ topicFilter, setTopicFilter, quizSize, setQuizSize, timerOn, setTimerOn, timePerQ, setTimePerQ, onStart, onBack, topics }) {
  const [showPicker, setShowPicker] = useState(false);
  return (
    <div className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen flex flex-col max-w-2xl mx-auto">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-200 p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-bold">Quiz Setup</h1>
      </div>
      <div className="flex-1 px-4 py-6 space-y-6">
        <Section label="Topic">
          <button onClick={() => setShowPicker(true)} className="w-full text-left bg-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 flex items-center justify-between">
            <span className="truncate">{topicFilter === 'All' ? 'All Topics' : topicFilter}</span>
            <span className="text-slate-400 ml-2">›</span>
          </button>
        </Section>
        <Section label="Number of Questions">
          <div className="grid grid-cols-4 gap-2">
            {QUIZ_SIZES.map(n => (
              <button key={n} onClick={() => setQuizSize(n)} className={`py-2.5 rounded-xl text-sm font-bold transition-colors ${quizSize === n ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}>{n}</button>
            ))}
          </div>
        </Section>
        <Section label="Timer">
          <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
            <span className="text-sm text-slate-200">Enable Timer</span>
            <button onClick={() => setTimerOn(t => !t)} className={`w-12 h-6 rounded-full transition-colors relative ${timerOn ? 'bg-amber-500' : 'bg-slate-600'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${timerOn ? 'left-6' : 'left-0.5'}`} />
            </button>
          </div>
          {timerOn && (
            <div className="mt-2 bg-slate-800 rounded-xl px-4 py-3">
              <div className="flex justify-between mb-2 text-xs text-slate-400"><span>Seconds per question</span><span className="text-amber-400 font-bold">{timePerQ}s</span></div>
              <input type="range" min={30} max={180} step={15} value={timePerQ} onChange={e => setTimePerQ(Number(e.target.value))} className="w-full accent-amber-500" />
              <div className="flex justify-between text-xs text-slate-600 mt-1"><span>30s</span><span>3min</span></div>
            </div>
          )}
        </Section>
      </div>
      <div className="px-4 pb-8">
        <button onClick={onStart} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-2xl transition-colors active:scale-95 text-lg">Start Quiz ⏱</button>
      </div>
      {showPicker && <TopicPicker topics={topics} selected={topicFilter} onSelect={t => { setTopicFilter(t); setShowPicker(false); }} onClose={() => setShowPicker(false)} />}
    </div>
  );
}

function Section({ label, children }) {
  return <div><p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">{label}</p>{children}</div>;
}

function ReviewScreen({ quiz, answers, onRetry, onHome, onResults, onErrorLog }) {
  const score = answers.filter(a => a.correct).length;
  const pct = Math.round((score / quiz.length) * 100);
  const [showWrong, setShowWrong] = useState(false);
  const wrong = quiz.filter((_, i) => answers[i] && !answers[i].correct);
  return (
    <div className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen flex flex-col max-w-2xl mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="text-7xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}</div>
        <h2 className="text-3xl font-bold mb-1"><span className={pct >= 80 ? 'text-emerald-400' : pct >= 60 ? 'text-amber-400' : 'text-red-400'}>{pct}%</span></h2>
        <p className="text-slate-400 text-sm mb-6">{score} out of {quiz.length} correct</p>
        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center"><p className="text-2xl font-bold text-emerald-400">{score}</p><p className="text-xs text-slate-400">Correct</p></div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center"><p className="text-2xl font-bold text-red-400">{quiz.length - score}</p><p className="text-xs text-slate-400">Wrong</p></div>
        </div>
        {wrong.length > 0 && (
          <div className="w-full mb-4">
            <button onClick={() => setShowWrong(w => !w)} className="w-full text-left bg-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between text-sm">
              <span>Review {wrong.length} missed questions</span><span className="text-slate-400">{showWrong ? '▲' : '▼'}</span>
            </button>
            {showWrong && (
              <div className="mt-2 space-y-3 max-h-64 overflow-y-auto">
                {wrong.map(q => (
                  <div key={q.id} className="bg-slate-800 rounded-2xl p-4 text-xs">
                    <p className="text-slate-300 leading-relaxed mb-2">{q.question.slice(0, 120)}…</p>
                    <p className="text-emerald-400 font-semibold">✓ {q.answer}. {q.options['ABCD'.indexOf(q.answer)]}</p>
                    <p className="text-red-400">✗ {answers[quiz.indexOf(q)]?.selected ? `${answers[quiz.indexOf(q)].selected}. ${q.options['ABCD'.indexOf(answers[quiz.indexOf(q)].selected)]}` : 'Timed out'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="w-full space-y-3">
          <button onClick={onRetry} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-2xl active:scale-95 transition-all">Try Again</button>
          {wrong.length > 0 && <button onClick={onErrorLog} className="w-full bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-3 rounded-2xl active:scale-95 transition-all text-sm">⚠️ View Error Log ({wrong.length} added)</button>}
          <button onClick={onResults} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 rounded-2xl active:scale-95 transition-all">View Progress</button>
          <button onClick={onHome} className="w-full text-slate-400 hover:text-slate-200 py-2 text-sm transition-colors">Back to Home</button>
        </div>
      </div>
    </div>
  );
}

function TopicPicker({ topics, selected, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center lg:justify-center" onClick={onClose}>
      <div className="bg-slate-800 w-full max-w-lg mx-auto rounded-t-3xl lg:rounded-3xl max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-slate-800 px-4 py-4 border-b border-slate-700"><p className="font-bold text-center">Select Topic</p></div>
        <div className="p-2">
          {topics.map(t => <button key={t} onClick={() => onSelect(t)} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${selected === t ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'hover:bg-slate-700 text-slate-300'}`}>{t}</button>)}
        </div>
      </div>
    </div>
  );
}
