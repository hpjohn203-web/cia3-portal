import { useState, useMemo, useRef } from 'react';
import questions from '../data/questions.json';
import { useProgress } from '../hooks/useProgress';

const TOPICS = ['All', ...Array.from(new Set(questions.map(q => q.topic))).sort()];
const SWIPE_THRESHOLD = 60;

export default function StudyMode({ onNavigate }) {
  const { recordAnswer, getDueQuestions, toggleBookmark, isBookmarked, progress } = useProgress();
  const [topicFilter, setTopicFilter] = useState('All');
  const [showTopicPicker, setShowTopicPicker] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showResult, setShowResult] = useState(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [mode, setMode] = useState('all');
  const [swipeHint, setSwipeHint] = useState(null); // 'left' | 'right' | null

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const didSwipe = useRef(false);

  const deck = useMemo(() => {
    let pool = topicFilter === 'All' ? questions : questions.filter(q => q.topic === topicFilter);
    if (mode === 'due') pool = getDueQuestions(pool);
    return [...pool].sort(() => Math.random() - 0.5);
  }, [topicFilter, mode, progress]);

  const card = deck[cardIndex];

  function handleFlip() { if (!flipped) setFlipped(true); }

  function handleAnswer(correct) {
    if (!card || showResult) return;
    recordAnswer(card.id, correct);
    setShowResult(correct ? 'correct' : 'wrong');
    setSwipeHint(null);
    setSessionTotal(t => t + 1);
    if (correct) setSessionCorrect(c => c + 1);
    setTimeout(() => {
      setShowResult(null);
      setFlipped(false);
      setCardIndex(i => (i + 1) % deck.length);
    }, 600);
  }

  function onTouchStart(e) {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    didSwipe.current = false;
    setSwipeHint(null);
  }

  function onTouchMove(e) {
    if (touchStartX.current === null) return;
    const dx = e.targetTouches[0].clientX - touchStartX.current;
    const dy = e.targetTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy)) {
      if (flipped && !showResult) setSwipeHint(dx > 0 ? 'right' : 'left');
    }
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    setSwipeHint(null);

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
      didSwipe.current = true;
      if (!flipped) {
        handleFlip();
      } else if (!showResult) {
        handleAnswer(dx > 0);
      }
    }
    touchStartX.current = null;
  }

  function handleCardClick() {
    if (didSwipe.current) { didSwipe.current = false; return; }
    handleFlip();
  }

  if (!card) {
    return (
      <div className="px-4 py-8 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-4xl mb-3">🎉</p>
        <p className="text-xl font-bold mb-2">No cards due!</p>
        <p className="text-slate-400 text-sm text-center mb-5">All caught up. Try switching to "All Cards" mode.</p>
        <button onClick={() => setMode('all')} className="bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-2xl">Show All Cards</button>
      </div>
    );
  }

  const bookmarked = isBookmarked(card.id);

  return (
    <div className="flex flex-col max-w-2xl mx-auto px-4 py-4 min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
      {/* Mobile back */}
      <button onClick={() => onNavigate('home')} className="lg:hidden flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mb-3 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Dashboard
      </button>

      {/* Controls bar */}
      <div className="flex items-center gap-2 mb-3">
        <button onClick={() => setShowTopicPicker(true)}
          className="flex-1 text-left text-xs bg-slate-800 rounded-lg px-3 py-2 text-slate-300 truncate">
          📂 {topicFilter === 'All' ? 'All Topics' : topicFilter}
        </button>
        <button onClick={() => setMode(m => m === 'all' ? 'due' : 'all')}
          className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${mode === 'due' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}>
          {mode === 'due' ? '⏰ Due' : '📚 All'}
        </button>
      </div>

      {/* Progress + bookmark */}
      <div className="flex items-center justify-between mb-2 text-xs text-slate-400">
        <span>{cardIndex + 1} / {deck.length}</span>
        <div className="flex items-center gap-3">
          {sessionTotal > 0 && <span>{sessionCorrect}/{sessionTotal} correct this session</span>}
          <button
            onClick={() => toggleBookmark(card.id)}
            className={`text-base transition-colors ${bookmarked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
          >🔖</button>
        </div>
      </div>
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(cardIndex / deck.length) * 100}%` }} />
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex flex-col pb-4">
        <div
          className="card-flip-container flex-1 cursor-pointer select-none"
          style={{ minHeight: '320px' }}
          onClick={handleCardClick}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={`card-flip-inner transition-transform ${flipped ? 'flipped' : ''} ${
              swipeHint === 'right' ? 'rotate-1 scale-[1.01]' : swipeHint === 'left' ? '-rotate-1 scale-[1.01]' : ''
            }`}
            style={{ minHeight: '320px' }}
          >
            {/* Front */}
            <div className="card-face flex flex-col bg-slate-800 rounded-3xl p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Question</span>
                <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full truncate max-w-[140px]">{card.topic}</span>
              </div>
              <p className="text-sm leading-relaxed flex-1">{card.question}</p>
              <div className="mt-4 text-center text-xs text-slate-500">
                Tap to reveal · <span className="lg:hidden">or swipe</span>
              </div>
            </div>
            {/* Back */}
            <div className={`card-face card-back flex flex-col bg-slate-800 rounded-3xl p-6 border transition-colors ${
              swipeHint === 'right' ? 'border-emerald-500/60 bg-emerald-500/5' :
              swipeHint === 'left'  ? 'border-red-500/60 bg-red-500/5' :
              'border-amber-500/40'
            }`}>
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-3">Answer</span>
              <div className="mb-3">
                <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-xl text-sm font-bold">
                  {card.answer}. {card.options['ABCD'.indexOf(card.answer)]}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed flex-1 overflow-auto">{card.explanation}</p>
            </div>
          </div>
        </div>

        {/* Swipe hint row (mobile only) */}
        {flipped && !showResult && (
          <div className="lg:hidden flex items-center justify-between text-xs mt-2 mb-1 px-1 select-none">
            <span className={`font-medium transition-colors ${swipeHint === 'left' ? 'text-red-400' : 'text-red-500/40'}`}>← Wrong</span>
            <span className="text-slate-600">swipe or tap buttons</span>
            <span className={`font-medium transition-colors ${swipeHint === 'right' ? 'text-emerald-400' : 'text-emerald-500/40'}`}>Correct →</span>
          </div>
        )}

        {flipped && !showResult && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button onClick={() => handleAnswer(false)}
              className="bg-red-500/20 border border-red-500/40 text-red-400 font-semibold py-4 rounded-2xl active:scale-95 transition-all">
              ✗  Got it wrong
            </button>
            <button onClick={() => handleAnswer(true)}
              className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold py-4 rounded-2xl active:scale-95 transition-all">
              ✓  Got it right
            </button>
          </div>
        )}

        {showResult && (
          <div className={`mt-4 py-4 rounded-2xl text-center font-bold text-lg ${showResult === 'correct' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {showResult === 'correct' ? '✓ Correct!' : '✗ Review this one'}
          </div>
        )}

        {!flipped && (
          <button onClick={() => { setFlipped(false); setCardIndex(i => (i + 1) % deck.length); }}
            className="mt-3 text-xs text-slate-500 hover:text-slate-400 py-2 transition-colors">
            Skip →
          </button>
        )}
      </div>

      {showTopicPicker && (
        <TopicPicker topics={TOPICS} selected={topicFilter}
          onSelect={t => { setTopicFilter(t); setCardIndex(0); setFlipped(false); setShowTopicPicker(false); }}
          onClose={() => setShowTopicPicker(false)} />
      )}
    </div>
  );
}

function TopicPicker({ topics, selected, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center lg:justify-center" onClick={onClose}>
      <div className="bg-slate-800 w-full max-w-lg mx-auto rounded-t-3xl lg:rounded-3xl max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-slate-800 px-4 py-4 border-b border-slate-700">
          <p className="font-bold text-center">Select Topic</p>
        </div>
        <div className="p-2">
          {topics.map(t => (
            <button key={t} onClick={() => onSelect(t)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${selected === t ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'hover:bg-slate-700 text-slate-300'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
