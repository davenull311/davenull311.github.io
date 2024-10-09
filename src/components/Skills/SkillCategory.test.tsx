import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SkillCategory from './SkillCategory';

const mockCategory = {
  name: 'Programming Languages',
  skills: [
    { name: 'JavaScript', icon: 'js-icon.png', proficiency: 90 },
    { name: 'Python', icon: 'python-icon.png', proficiency: 80 },
  ],
};

describe('SkillCategory component', () => {
  it('renders category name', () => {
    render(<SkillCategory category={mockCategory} isExpanded={false} onToggle={() => {}} />);
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
  });

  it('does not show skills when collapsed', () => {
    render(<SkillCategory category={mockCategory} isExpanded={false} onToggle={() => {}} />);
    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
  });

  it('shows skills when expanded', () => {
    render(<SkillCategory category={mockCategory} isExpanded={true} onToggle={() => {}} />);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const mockOnToggle = jest.fn();
    render(<SkillCategory category={mockCategory} isExpanded={false} onToggle={mockOnToggle} />);
    fireEvent.click(screen.getByText('Programming Languages'));
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});