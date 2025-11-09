
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (code: string) => { success: boolean, message: string };
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => { // Simulate network delay
        const result = onLogin(code);
        if (!result.success) {
            setError(result.message);
        }
        setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 transform transition-all hover:scale-105 duration-300">
        <div className="text-center">
          <i className="fa-solid fa-shield-halved text-5xl text-primary-500 dark:text-primary-400"></i>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            الرجاء إدخال كود الدخول للمتابعة
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code-input" className="sr-only">
              كود الدخول
            </label>
            <input
              id="code-input"
              name="code"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm text-center"
              placeholder="كود الدخول"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              dir="ltr"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 disabled:bg-primary-300 dark:disabled:bg-primary-800 transition-colors"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <i className="fa-solid fa-lock text-primary-500 group-hover:text-primary-400"></i>
                  </span>
                  دخول
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
