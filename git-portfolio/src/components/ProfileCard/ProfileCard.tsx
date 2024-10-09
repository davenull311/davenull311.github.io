import React from 'react';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-zinc-300 rounded-xl p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img src="profile-image.jpg" alt="Profile" className="w-full rounded-full" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-6xl md:text-9xl font-bold mb-4">DAVE NULL</h1>
          <p className="text-xl mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <img src="phone-icon.svg" alt="Phone" className="w-8 h-8 mr-4" />
              <span>TEXT ME</span>
            </div>
            <div className="flex items-center">
              <img src="email-icon.svg" alt="Email" className="w-8 h-8 mr-4" />
              <span>DAVE@DAVENULL311.COM</span>
            </div>
            <div className="flex items-center">
              <img src="location-icon.svg" alt="Location" className="w-8 h-8 mr-4" />
              <span>KNOXVILLE, TN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;