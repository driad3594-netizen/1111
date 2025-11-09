
import React from 'react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, isLoggedIn, onLogout }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">
        <i className="fa-solid fa-square-poll-vertical mr-2"></i>
        نظام الاستبانة الذكي
      </h1>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
          {theme === 'light' ? <i className="fas fa-moon text-xl"></i> : <i className="fas fa-sun text-xl"></i>}
        </button>
        {isLoggedIn && (
          <button onClick={onLogout} className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <i className="fas fa-sign-out-alt text-xl"></i>
          </button>
        )}
      </div>
    </header>
  );
};
