import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="large-profile-photo.jpg"
              alt="Large profile"
              className="rounded-full w-64 h-64 mx-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Hello, I'm Dave.</h2>
            <p className="text-lg mb-4">
              Short introduction goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="mb-4">
              More detailed background or experience description. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Interests</h3>
              <ul className="list-disc list-inside">
                <li>Interest 1</li>
                <li>Interest 2</li>
                <li>Interest 3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;