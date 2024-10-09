import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileCard from './ProfileCard';

const mockProfileData = {
  name: {
    firstName: "DAVE",
    lastName: "NULL"
  },
  description: "Test description",
  imageSrc: "test-image.jpg",
  contactInfo: {
    phone: "123-456-7890",
    email: "test@example.com",
    location: "Test City, TS"
  }
};

describe('ProfileCard', () => {
  it('renders profile information correctly', () => {
    render(<ProfileCard {...mockProfileData} />);

    expect(screen.getByText("DAVE")).toBeInTheDocument();
    expect(screen.getByText("NULL")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByAltText("Profile picture of DAVE NULL")).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Test City, TS")).toBeInTheDocument();
  });
});