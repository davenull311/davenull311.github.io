import React from 'react';
import ProfilePhoto from './ProfilePhoto';
import Introduction from './Introduction';
import Background from './Background';
import InterestsSection from './InterestsSection';

interface AboutProps {
  firstName: string;
  profilePhotoSrc: string;
  introText: string;
  backgroundText: string;
  interests: Array<{ icon: string; text: string }>;
}

const About: React.FC<AboutProps> = ({
  firstName,
  profilePhotoSrc,
  introText,
  backgroundText,
  interests,
}) => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <ProfilePhoto src={profilePhotoSrc} alt={`${firstName}'s profile`} />
          <div className="md:ml-12 mt-8 md:mt-0">
            <Introduction firstName={firstName} introText={introText} />
            <Background backgroundText={backgroundText} />
          </div>
        </div>
        <InterestsSection interests={interests} />
      </div>
    </section>
    );
};

export default About;