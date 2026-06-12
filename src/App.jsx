import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import './App.css';

export default function App() {
  const [profileResult, setProfileResult] = useState(() => {
    const saved = localStorage.getItem('moneymind_profile');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Estado global de gamificação do MoneyMind
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('moneymind_gamestate');
    return saved ? JSON.parse(saved) : {
      xp: 350,
      level: 2,
      justLeveledUp: false,
    };
  });

  // Salvar estado do jogo sempre que mudar
  useEffect(() => {
    localStorage.setItem('moneymind_gamestate', JSON.stringify(gameState));
  }, [gameState]);

  const updateProfileResult = useCallback((newProfile) => {
    setProfileResult(newProfile);
    if (newProfile) {
      localStorage.setItem('moneymind_profile', JSON.stringify(newProfile));
    } else {
      localStorage.removeItem('moneymind_profile');
    }
  }, []);

  const addXp = useCallback((amount) => {
    setGameState((prev) => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let leveledUp = false;
      
      // Cada nível requer: Nível Atual * 500 XP
      const xpNeeded = newLevel * 500;

      if (newXp >= xpNeeded) {
        newXp = newXp - xpNeeded;
        newLevel += 1;
        leveledUp = true;
      } else if (newXp < 0) {
        if (newLevel > 1) {
          newLevel -= 1;
          const prevXpNeeded = newLevel * 500;
          newXp = prevXpNeeded + newXp;
        } else {
          newXp = 0;
        }
      }

      return {
        xp: newXp,
        level: newLevel,
        justLeveledUp: leveledUp,
      };
    });
  }, []);

  const clearLevelUpNotification = useCallback(() => {
    setGameState((prev) => ({ ...prev, justLeveledUp: false }));
  }, []);


  return (
    <BrowserRouter>
      <Navbar
        profile={profileResult}
        level={gameState.level}
        xp={gameState.xp}
        nextLevelXp={gameState.level * 500}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/quiz"
          element={<Quiz onProfileResult={updateProfileResult} />}
        />
        <Route
          path="/perfil"
          element={<Profile profile={profileResult} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              profile={profileResult}
              gameState={gameState}
              addXp={addXp}
              clearLevelUpNotification={clearLevelUpNotification}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

