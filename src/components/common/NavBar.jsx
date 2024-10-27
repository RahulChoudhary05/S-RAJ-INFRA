import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLock, FiMenu, FiX } from "react-icons/fi"; // Importing icons
import logo from "../../assets/Logo/logo.svg";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar visibility
  const [isScrolled, setIsScrolled] = useState(false); // Navbar background change on scroll

  useEffect(() => {
    // Listen for scroll events
    const handleScroll = () => {
      if (window.scrollY > 150) { // Adjust scroll value for when the navbar should change
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event listener on unmount
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 py-2 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between mx-auto w-11/12 lg:w-10/12">
        {/* Left: Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-14 md:h-16 cursor-pointer transition-transform duration-300 hover:scale-105"
        />

        {/* Right: Hamburger Menu Icon for Mobile */}
        <div className="block lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </div>

        {/* Center: SlideTabs for larger screens */}
        <div className="hidden lg:flex mx-auto">
          <SlideTabs />
        </div>

        {/* Right: Contact Us Button for larger screens */}
        <div className="hidden lg:block">
          <ContactUsButton />
        </div>
      </div>

      {/* Sidebar for mobile navigation */}
      <motion.div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-12" />
          </div>
          <button onClick={() => setIsOpen(false)} className="text-xl">
            <FiX />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-start p-4">
          <NavItem onClick={() => setIsOpen(false)}>Home</NavItem>
          <NavItem onClick={() => setIsOpen(false)}>About Us</NavItem>
          <NavItem onClick={() => setIsOpen(false)}>Projects</NavItem>
          <NavItem onClick={() => setIsOpen(false)}>Career</NavItem>
        </nav>

        {/* Contact Us Button in Sidebar */}
        <div className="flex justify-center mt-auto p-4">
          <ContactUsButton />
        </div>
      </motion.div>
    </div>
  );
};

// NavItem Component
const NavItem = ({ children, onClick }) => {
  return (
    <li
      onClick={onClick} // Close the sidebar on item click
      className="cursor-pointer py-2 px-4 text-black hover:bg-indigo-100 w-full text-left"
    >
      {children}
    </li>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-[2px] border-[#866A04]  transparent p-1"
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>About Us</Tab>
      <Tab setPosition={setPosition}>Projects</Tab>
      <Tab setPosition={setPosition}>Career</Tab>
      {/* <Tab setPosition={setPosition}>Blog</Tab> */}

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false); // New state to manage hover status

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });

        setIsHovered(true); // Set hover state to true
      }}
      onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base"
    >
      {/* Conditionally applying text color based on hover state */}
      <p className={`font-bold ${isHovered ? 'text-white' : 'text-black'}`}>
        {children}
      </p>
    </li>
  );
};


const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

// Contact Us Button with Enhanced Animation
const ContactUsButton = () => {
  const intervalRef = useRef(null);
  const TARGET_TEXT = "Contact Us";
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;
  const CHARS = "!@#$%^&*():{};|,.<>/?";
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group relative overflow-hidden rounded-lg border-[2px] border-[#866A04] bg-neutral-700 px-6 py-2 font-mono font-medium uppercase transition-colors hover:bg-black hover:text-white"
    >
      <div className="relative z-10 flex items-center gap-2">
        <FiLock />
        <span className="font-bold">{text}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};


export default NavBar;
