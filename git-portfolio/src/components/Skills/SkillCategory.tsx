import React from 'react';
import SkillItem from './SkillItem';
import { SkillCategoryType } from './types';

interface SkillCategoryProps {
  category: SkillCategoryType;
  isExpanded: boolean;
  onToggle: () => void;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, isExpanded, onToggle }) => {
  return (
    <div className="mb-8">
      <button
        onClick={onToggle}
        className="w-full text-left text-xl font-semibold mb-4 flex justify-between items-center"
      >
        {category.name}
        <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isExpanded && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {category.skills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillCategory;