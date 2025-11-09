import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, children }) => {
  return (
    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
      <div className="flex justify-center items-center mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
        <i className={`fas ${icon} text-3xl text-gray-500 dark:text-gray-400`}></i>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">{message}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};
