import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 right-0 bg-white shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Logo
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/resume" className="hover:text-gray-700">
              Resume
            </Link>
            <a href="#about" className="hover:text-gray-700">
              About
            </a>
            <a href="#projects" className="hover:text-gray-700">
              Projects
            </a>
            <a href="#skills" className="hover:text-gray-700">
              Skills
            </a>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;