import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignIn, useAuth, UserButton } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import WeatherWidget from './components/WeatherWidget';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const App = () => {
  const { isLoaded } = useAuth();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <SignedIn>
        <div className="header">
          <h1>Todo App</h1>
          <div className="header-controls">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <WeatherWidget />
        <TaskInput />
        <TaskList />
      </SignedIn>
      <SignedOut>
        <div className="sign-in-container">
          <SignIn />
        </div>
      </SignedOut>
    </div>
  );
};

export default App;