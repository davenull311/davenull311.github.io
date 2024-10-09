import React from 'react';
import ContactInfo from './ContactInfo';
import NameDisplay from './NameDisplay';

interface ProfileCardProps {
  name: {
    firstName: string;
    lastName: string;
  };
  description: string;
  imageSrc: string;
  contactInfo: {
    phone: string;
    email: string;
    location: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, description, imageSrc, contactInfo }) => {
  return (
    <section className="flex overflow-hidden flex-col pt-24 pb-7 bg-white">
      <div className="self-center px-12 py-16 w-full rounded-xl bg-zinc-300 max-w-[1240px] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xl text-black max-md:mt-10">
              <img
                loading="lazy"
                src={imageSrc}
                alt={`Profile picture of ${name.firstName} ${name.lastName}`}
                className="object-contain w-full aspect-square rounded-[200px] max-md:mr-1"
              />
              <ContactInfo {...contactInfo} />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-16 w-full max-md:mt-10 max-md:max-w-full">
              <NameDisplay firstName={name.firstName} lastName={name.lastName} />
              <p className="mt-11 mr-14 ml-10 text-xl text-black max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                {description}
              </p>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bfff30e7e57f7fd2ccb26f9f92ed5233641ece4af3ff1d23838d76602eecd25?placeholderIfAbsent=true&apiKey=b44aff566ca945f393e955e82b7757ab"
                alt=""
                className="object-contain self-center mt-36 ml-3.5 max-w-full aspect-[7.46] w-[559px] max-md:mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;