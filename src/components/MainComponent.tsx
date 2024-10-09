import React from 'react';
import ProfileCard from './ProfileCard/ProfileCard';
import Navigation from './Navigation/Navigation';

const MainComponent: React.FC = () => {
  const profileData = {
    name: { firstName: "DAVE", lastName: "NULL" },
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/71afd9853a365ad3d07e289b701727852889244827a5767b22bf6a66b41bd4b2?placeholderIfAbsent=true&apiKey=b44aff566ca945f393e955e82b7757ab",
    contactInfo: {
      phone: "TEXT ME",
      email: "DAVE@DAVENULL311.COM",
      location: "KNOXVILLE, TN"
    }
  };

  const navigationItems = [
    { label: "RESUME", link: "../Resume" },
    { label: "ABOUT", link: "#about" },
    { label: "PROJECTS", link: "#projects" },
    { label: "SKILLS", link: "#skills" },
    { label: "BLAH", link: "#" },
    { label: "BLAH", link: "#" },
    { label: "BLAH", link: "#" },
    { label: "BLAH", link: "#" }
  ];

  return (
    <>
      <ProfileCard {...profileData} />
      <Navigation items={navigationItems} />
      <section id="about">
        <h2>About</h2>
      </section>
      <section id="projects">
        <h2>Projects</h2>
      </section>
      <section id="skills">
        <h2>Skills</h2>
      </section>
    </>
  );
};

export default MainComponent;
