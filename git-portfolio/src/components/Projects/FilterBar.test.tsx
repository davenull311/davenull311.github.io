import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('FilterBar component', () => {
  const mockTags = ['All', 'React', 'Node.js', 'TypeScript'];
  const mockOnFilter = jest.fn();

  it('renders all tags', () => {
    render(<FilterBar tags={mockTags} onFilter={mockOnFilter} />);
    mockTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('calls onFilter with correct tag when a filter button is clicked', () => {
    render(<FilterBar tags={mockTags} onFilter={mockOnFilter} />);
    fireEvent.click(screen.getByText('React'));
    expect(mockOnFilter).toHaveBeenCalledWith('React');
  });
});