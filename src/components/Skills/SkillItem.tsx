import React from 'react';
import { Skill } from './types';

interface SkillItemProps {
  skill: Skill;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-2" />
      <span className="text-sm font-medium">{skill.name}</span>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${skill.proficiency}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillItem;