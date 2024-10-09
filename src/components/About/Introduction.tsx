import React from 'react';

interface IntroductionProps {
  firstName: string;
  introText: string;
}

const Introduction: React.FC<IntroductionProps> = ({ firstName, introText }) => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold mb-4">Hello, I'm {firstName}.</h2>
      <p className="text-lg">{introText}</p>
    </div>
  );
};

export default Introduction;