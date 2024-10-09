import React from 'react';

interface Interest {
  icon: string;
  text: string;
}

interface InterestsSectionProps {
  interests: Interest[];
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ interests }) => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6">Interests & Fun Facts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interests.map((interest, index) => (
          <div key={index} className="flex items-center">
            <img src={interest.icon} alt="" className="w-8 h-8 mr-3" />
            <span>{interest.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestsSection;