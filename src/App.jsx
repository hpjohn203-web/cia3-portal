import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import StudyMode from './components/StudyMode';
import QuizMode from './components/QuizMode';
import Results from './components/Results';
import VideoLibrary from './components/VideoLibrary';
import Glossary from './components/Glossary';
import Formulas from './components/Formulas';
import Diagrams from './components/Diagrams';
import StudyPlanner from './components/StudyPlanner';
import ErrorLog from './components/ErrorLog';
import Bookmarks from './components/Bookmarks';
import Search from './components/Search';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [lightMode, setLightMode] = useState(() => localStorage.getItem('cia3_theme') === 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', lightMode);
    localStorage.setItem('cia3_theme', lightMode ? 'light' : 'dark');
  }, [lightMode]);

  return (
    <Layout screen={screen} onNavigate={setScreen} lightMode={lightMode} onToggleTheme={() => setLightMode(m => !m)}>
      {screen === 'home'      && <Home onNavigate={setScreen} />}
      {screen === 'study'     && <StudyMode onNavigate={setScreen} />}
      {screen === 'quiz'      && <QuizMode onNavigate={setScreen} />}
      {screen === 'results'   && <Results onNavigate={setScreen} />}
      {screen === 'videos'    && <VideoLibrary onNavigate={setScreen} />}
      {screen === 'glossary'  && <Glossary onNavigate={setScreen} />}
      {screen === 'formulas'  && <Formulas onNavigate={setScreen} />}
      {screen === 'diagrams'  && <Diagrams onNavigate={setScreen} />}
      {screen === 'planner'   && <StudyPlanner onNavigate={setScreen} />}
      {screen === 'errorlog'  && <ErrorLog onNavigate={setScreen} />}
      {screen === 'bookmarks' && <Bookmarks onNavigate={setScreen} />}
      {screen === 'search'    && <Search onNavigate={setScreen} />}
    </Layout>
  );
}
