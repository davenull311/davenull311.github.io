import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePhoto from './ProfilePhoto';

describe('ProfilePhoto component', () => {
  it('renders the image with correct src and alt attributes', () => {
    render(<ProfilePhoto src="test-image.jpg" alt="Test profile" />);
    const img = screen.getByAltText('Test profile');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });
});