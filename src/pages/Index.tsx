
import React from 'react';
import { useA11y } from '@/hooks/accessibility/useA11yContext';

const IndexPage = () => {
  const a11y = useA11y();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Main Index Page</h1>
      <p className="text-lg mb-4">Welcome to the application.</p>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="mb-4">
          This application provides tools for network analysis, AI assistance, and system monitoring.
          Use the navigation menu to explore different features.
        </p>
        <button 
          onClick={() => {
            a11y.announce('Welcome message read');
            a11y.playSound('click');
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
