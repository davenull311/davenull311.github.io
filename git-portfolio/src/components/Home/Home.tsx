import React from 'react';
import ProfileCard from '../ProfileCard/ProfileCard';
import LinkPanel from '../LinkPanel/LinkPanel';
import About from '../About/About';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <ProfileCard />
      <LinkPanel />
      <About />
      <Projects />
      <Skills />
    </div>
  );
};

export default Home;