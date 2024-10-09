import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';

const mockNavigationItems = [
  { label: "RESUME", link: "../Resume" },
  { label: "ABOUT", link: "#about" },
  { label: "PROJECTS", link: "#projects" },
  { label: "SKILLS", link: "#skills" }
];

describe('Navigation', () => {
  it('renders navigation items correctly', () => {
    render(
      <Router>
        <Navigation items={mockNavigationItems} />
      </Router>
    );

    mockNavigationItems.forEach(item => {
      const element = screen.getByText(item.label);
      expect(element).toBeInTheDocument();
      if (item.link.startsWith('#')) {
        expect(element.tagName).toBe('A');
        expect(element).toHaveAttribute('href', item.link);
      } else {
        expect(element.tagName).toBe('A');
        expect(element).toHaveAttribute('href', item.link);
      }
    });
  });

  it('becomes sticky when scrolling down', () => {
    const { container } = render(
        <Router>
          <Navigation items={mockNavigationItems} />
        </Router>
      );
  
      const nav = container.querySelector('nav');
      expect(nav).not.toHaveClass('fixed');
  
      fireEvent.scroll(window, { target: { scrollY: 1000 } });
      expect(nav).toHaveClass('fixed');
    });
  });

function expect(element: HTMLElement) {
  throw new Error('Function not implemented.');
}
