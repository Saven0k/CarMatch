import React from 'react';

const Loader: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ 
        display: 'inline-block',
        width: '50px',
        height: '50px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;