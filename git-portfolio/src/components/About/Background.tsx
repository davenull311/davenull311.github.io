import React from 'react';

interface BackgroundProps {
  backgroundText: string;
}

const Background: React.FC<BackgroundProps> = ({ backgroundText }) => {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-3">Background</h3>
      <p className="text-base">{backgroundText}</p>
    </div>
  );
};

export default Background;