import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Skills from './Skills';

const mockCategories = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: 'js-icon.png', proficiency: 90 },
      { name: 'Python', icon: 'python-icon.png', proficiency: 80 },
    ],
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'React', icon: 'react-icon.png', proficiency: 85 },
      { name: 'Vue', icon: 'vue-icon.png', proficiency: 75 },
    ],
  },
];

describe('Skills component', () => {
  it('renders all category names', () => {
    render(<Skills categories={mockCategories} />);
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
  });

  it('expands and collapses categories on click', () => {
    render(<Skills categories={mockCategories} />);
    const programmingLanguagesButton = screen.getByText('Programming Languages');
    
    fireEvent.click(programmingLanguagesButton);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    
    fireEvent.click(programmingLanguagesButton);
    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
  });

  it('renders the "View Resume" button', () => {
    render(<Skills categories={mockCategories} />);
    const resumeButton = screen.getByText('View Resume');
    expect(resumeButton).toBeInTheDocument();
    expect(resumeButton).toHaveAttribute('href', '/resume');
  });
});