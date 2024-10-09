import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavigationItem {
  label: string;
  link: string;
}

interface NavigationProps {
  items: NavigationItem[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current && placeholderRef.current) {
        const navTop = navRef.current.getBoundingClientRect().top;
        setIsSticky(navTop <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
      ref={placeholderRef}
      style={{ height: isSticky ? navRef.current?.offsetHeight : 0 }}
    />
    <nav
      ref={navRef}
      className={`flex flex-col items-center px-16 pt-7 pb-12 w-full text-3xl text-black whitespace-nowrap bg-zinc-300 max-md:px-5 max-md:max-w-full ${
        isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'mt-24 max-md:mt-10'
      }`}
    >
      <ul className="flex flex-wrap gap-10 w-full max-w-[1163px] max-md:max-w-full">
        {items.map((item, index) => (
          <li key={index} className="grow shrink">
            {item.link.startsWith('#') ? (
              <a href={item.link}>{item.label}</a>
            ) : (
              <Link to={item.link}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  </>
);
};

export default Navigation;