import React from 'react';
import { render, screen } from '@testing-library/react';
import InterestsSection from './InterestsSection';

const mockInterests = [
  { icon: 'icon1.svg', text: 'Travel' },
  { icon: 'icon2.svg', text: 'Photography' },
];

describe('InterestsSection component', () => {
  it('renders interests correctly', () => {
    render(<InterestsSection interests={mockInterests} />);
    expect(screen.getByText('Interests & Fun Facts')).toBeInTheDocument();
    expect(screen.getByText('Travel')).toBeInTheDocument();
    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});