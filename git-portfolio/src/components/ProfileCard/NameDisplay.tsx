import React from 'react';

interface NameDisplayProps {
  firstName: string;
  lastName: string;
}

const NameDisplay: React.FC<NameDisplayProps> = ({ firstName, lastName }) => {
  return (
    <div className="max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <h1 className="text-9xl text-black max-md:mt-8 max-md:text-4xl">
            {firstName}
          </h1>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <h1 className="text-9xl font-bold text-black max-md:mt-8 max-md:text-4xl">
            {lastName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NameDisplay;