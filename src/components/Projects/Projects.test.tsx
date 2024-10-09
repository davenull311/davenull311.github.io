import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Projects from './Projects';

const mockProjects = [
  {
    id: '1',
    title: 'Project 1',
    description: 'Description 1',
    image: 'image1.jpg',
    tags: ['React', 'TypeScript'],
    demoLink: 'https://demo1.com',
    githubLink: 'https://github.com/project1',
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'Description 2',
    image: 'image2.jpg',
    tags: ['Node.js', 'Express'],
    demoLink: 'https://demo2.com',
    githubLink: 'https://github.com/project2',
  },
];

describe('Projects component', () => {
  it('renders all projects initially', () => {
    render(<Projects projects={mockProjects} />);
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  it('filters projects when a tag is selected', () => {
    render(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByText('React'));
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.queryByText('Project 2')).not.toBeInTheDocument();
  });

  it('shows all projects when "All" filter is selected', () => {
    render(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByText('React'));
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });
});