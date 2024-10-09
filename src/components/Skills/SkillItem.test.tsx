import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillItem from './SkillItem';

const mockSkill = {
  name: 'JavaScript',
  icon: 'js-icon.png',
  proficiency: 90,
};

describe('SkillItem component', () => {
  it('renders skill name', () => {
    render(<SkillItem skill={mockSkill} />);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('renders skill icon', () => {
    render(<SkillItem skill={mockSkill} />);
    const icon = screen.getByAltText('JavaScript');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'js-icon.png');
  });

  it('renders proficiency bar with correct width', () => {
    render(<SkillItem skill={mockSkill} />);
    const proficiencyBar = screen.getByRole('progressbar');
    expect(proficiencyBar).toHaveStyle('width: 90%');
  });
});