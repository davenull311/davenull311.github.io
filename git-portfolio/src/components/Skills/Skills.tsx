import React, { useState } from 'react';
import SkillCategory from './SkillCategory';
import { Skill, SkillCategoryType } from './types';

interface SkillsProps {
  categories: SkillCategoryType[];
}

const Skills: React.FC<SkillsProps> = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <section id="skills" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        {categories.map((category) => (
          <SkillCategory
            key={category.name}
            category={category}
            isExpanded={expandedCategory === category.name}
            onToggle={() => toggleCategory(category.name)}
          />
        ))}
        <div className="mt-12 text-center">
          <a
            href="/resume"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            View Resume
          </a>
          </div>
      </div>
    </section>
  );
};

export default Skills;