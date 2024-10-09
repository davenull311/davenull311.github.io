import React from 'react';

interface FilterBarProps {
  tags: string[];
  onFilter: (tag: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ tags, onFilter }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onFilter(tag)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;