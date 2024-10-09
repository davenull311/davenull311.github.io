import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

const mockProps = {
  firstName: 'John',
  profilePhotoSrc: 'path/to/photo.jpg',
  introText: 'I am a software developer.',
  backgroundText: 'I have 5 years of experience.',
  interests: [
    { icon: 'path/to/icon1.svg', text: 'Coding' },
    { icon: 'path/to/icon2.svg', text: 'Reading' },
  ],
};

describe('About component', () => {
  it('renders correctly with given props', () => {
    render(<About {...mockProps} />);

    expect(screen.getByAltText("John's profile")).toBeInTheDocument();
    expect(screen.getByText("Hello, I'm John.")).toBeInTheDocument();
    expect(screen.getByText('I am a software developer.')).toBeInTheDocument();
    expect(screen.getByText('I have 5 years of experience.')).toBeInTheDocument();
    expect(screen.getByText('Coding')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });
});