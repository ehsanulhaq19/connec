import React from 'react';

interface ThemeSwitcherProps {
  mode: 'light' | 'dark';
  toggle: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ mode, toggle }) => {
  return (
    <button
      className="btn-secondary"
      aria-label="Toggle theme"
      onClick={toggle}
    >
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeSwitcher; 