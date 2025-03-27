import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  return (
    <button 
      className="theme-toggle"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      🌙
    </button>
  );
};

export default ThemeToggle;


