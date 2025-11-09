
import React, { useCallback, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/ui/Header';
import { LoginPage } from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import { SurveyPage } from './components/SurveyPage';

function App() {
  const [theme, toggleTheme] = useTheme();
  const { isAdmin, user, isLoading, login, logout, completeSurvey } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSurveyComplete = useCallback(() => {
    completeSurvey();
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
    }, 3000);
  }, [completeSurvey]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <i className="fas fa-spinner fa-spin text-4xl text-primary-500"></i>
        </div>
      );
    }

    if (showSuccess) {
       return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center p-4">
          <i className="fa-solid fa-check-circle text-6xl text-green-500 mb-4 animate-bounce"></i>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">تم الإرسال بنجاح!</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">شكراً لمشاركتك.</p>
        </div>
      );
    }

    if (isAdmin) {
      return <AdminDashboard />;
    }
    if (user) {
      return <SurveyPage userCode={user.code} onComplete={handleSurveyComplete} />;
    }
    return <LoginPage onLogin={login} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme}
        isLoggedIn={isAdmin || !!user}
        onLogout={logout}
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
