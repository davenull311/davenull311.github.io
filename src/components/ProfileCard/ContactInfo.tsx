import React from 'react';

interface ContactInfoProps {
  phone: string;
  email: string;
  location: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ phone, email, location }) => {
  return (
    <div className="flex flex-col items-start pl-11 mt-20 w-full max-md:pl-5 max-md:mt-10">
      <div className="flex gap-8">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8d044ecd28b76785a5616732694fc0a3f826a37375df288f1ffd05e02ec1ec7?placeholderIfAbsent=true&apiKey=b44aff566ca945f393e955e82b7757ab" alt="" className="object-contain shrink-0 aspect-[0.81] w-[30px]" />
        <div className="self-start">{phone}</div>
      </div>
      <div className="flex gap-8 mt-4 whitespace-nowrap">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d02836e55daca2e3a89810e1f82e85e11fc150168f007fd8df32b2cd76d950bd?placeholderIfAbsent=true&apiKey=b44aff566ca945f393e955e82b7757ab" alt="" className="object-contain shrink-0 aspect-[0.81] w-[30px]" />
        <div className="flex-auto my-auto">{email}</div>
      </div>
      <div className="flex gap-8 mt-4">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4492baad9f69618281c3927b8d58c32962f96da33769be8273b914a5feeba9a5?placeholderIfAbsent=true&apiKey=b44aff566ca945f393e955e82b7757ab" alt="" className="object-contain shrink-0 aspect-[0.81] w-[30px]" />
        <div className="my-auto basis-auto">{location}</div>
      </div>
    </div>
  );
};

export default ContactInfo;