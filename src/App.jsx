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
  const [notifEnabled, setNotifEnabled] = useState(() => localStorage.getItem('cia3_notif_enabled') === '1');

  async function toggleNotif() {
    if (!('Notification' in window)) return;
    if (notifEnabled) {
      localStorage.removeItem('cia3_notif_enabled');
      setNotifEnabled(false);
    } else {
      if (Notification.permission === 'granted') {
        localStorage.setItem('cia3_notif_enabled', '1');
        setNotifEnabled(true);
        new Notification('CIA Part 3 Study Reminder 📚', { body: "Reminders enabled! We'll nudge you if you haven't studied today.", icon: '/favicon.ico' });
      } else if (Notification.permission === 'default') {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          localStorage.setItem('cia3_notif_enabled', '1');
          setNotifEnabled(true);
          new Notification('CIA Part 3 Study Reminder 📚', { body: "Reminders enabled! We'll nudge you if you haven't studied today.", icon: '/favicon.ico' });
        }
      } else {
        alert('Notifications are blocked in your browser. Please allow them in your browser settings, then try again.');
      }
    }
  }

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', lightMode);
    localStorage.setItem('cia3_theme', lightMode ? 'light' : 'dark');
  }, [lightMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!('Notification' in window)) return;
      const raw = localStorage.getItem('cia3_progress');
      const data = raw ? JSON.parse(raw) : {};
      const today = new Date().toDateString();
      const studiedToday = (data.sessionHistory || []).some(s => new Date(s.date).toDateString() === today);
      if (studiedToday) return;
      if (Notification.permission === 'granted' && localStorage.getItem('cia3_notif_enabled') === '1') {
        new Notification('CIA Part 3 Study Reminder 📚', {
          body: "You haven't studied today yet — keep your streak going!",
          icon: '/favicon.ico'
        });
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout screen={screen} onNavigate={setScreen} lightMode={lightMode} onToggleTheme={() => setLightMode(m => !m)} notifEnabled={notifEnabled} onToggleNotif={toggleNotif}>
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
