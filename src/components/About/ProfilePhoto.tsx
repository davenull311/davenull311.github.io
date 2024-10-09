import React from 'react';

interface ProfilePhotoProps {
  src: string;
  alt: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, alt }) => {
  return (
    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default ProfilePhoto;