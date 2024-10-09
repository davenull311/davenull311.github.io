import React from 'react';
import { render, screen } from '@testing-library/react';
import Introduction from './Introduction';

describe('Introduction component', () => {
  it('renders the greeting and intro text correctly', () => {
    render(<Introduction firstName="Jane" introText="I am a designer." />);
    expect(screen.getByText("Hello, I'm Jane.")).toBeInTheDocument();
    expect(screen.getByText('I am a designer.')).toBeInTheDocument();
  });
});