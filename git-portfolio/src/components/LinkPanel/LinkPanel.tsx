import React from 'react';

const LinkPanel: React.FC = () => {
  const links = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/', icon: 'linkedin-icon.svg' },
    { name: 'GitHub', url: 'https://github.com/', icon: 'github-icon.svg' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com/', icon: 'stackoverflow-icon.svg' },
    { name: 'Dev.to', url: 'https://dev.to/', icon: 'devto-icon.svg' },
    { name: 'Figma', url: 'https://www.figma.com/', icon: 'figma-icon.svg' },
  ];

  return (
    <div className="flex justify-center space-x-4 my-8">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <img src={link.icon} alt={link.name} className="w-10 h-10" />
        </a>
      ))}
    </div>
  );
};

export default LinkPanel;