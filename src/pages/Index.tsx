
import React from 'react';
import { useA11y } from '@/hooks/useA11y';

// Re-export the hook with the expected name
export const useA11yContext = useA11y;

const IndexPage = () => {
  return (
    <div>
      <h1>Main Index Page</h1>
      <p>Welcome to the application.</p>
    </div>
  );
};

export default IndexPage;
