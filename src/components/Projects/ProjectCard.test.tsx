import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

const mockProject = {
  title: 'Test Project',
  description: 'This is a test project',
  image: 'test-image.jpg',
  tags: ['React', 'TypeScript'],
  demoLink: 'https://demo.com',
  githubLink: 'https://github.com/test-project',
};

describe('ProjectCard component', () => {
  it('renders project details correctly', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project')).toBeInTheDocument();
    expect(screen.getByAltText('Test Project')).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('View Demo')).toHaveAttribute('href', 'https://demo.com');
    expect(screen.getByText('GitHub')).toHaveAttribute('href', 'https://github.com/test-project');
  });
});