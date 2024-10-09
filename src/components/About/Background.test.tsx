import React from 'react';
import { render, screen } from '@testing-library/react';
import Background from './Background';

describe('Background component', () => {
  it('renders the background text correctly', () => {
    render(<Background backgroundText="10 years in the industry." />);
    expect(screen.getByText('Background')).toBeInTheDocument();
    expect(screen.getByText('10 years in the industry.')).toBeInTheDocument();
  });
});