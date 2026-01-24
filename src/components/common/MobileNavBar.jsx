import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const mobileLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Career", path: "/career" },
  { title: "About", path: "/about" },
  { title: "Contact Us", path: "/contactus" },
];

export const HoverImageLinks = ({ onLinkClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full bg-white"
    >
      {/* NAV ITEMS */}
      <ul className="flex flex-col items-center gap-6">
        {mobileLinks.map((item, index) => (
          <motion.li
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.08 }}
            className="text-4xl font-serif font-medium text-neutral-800 hover:text-black transition"
          >
            <Link to={item.path} onClick={onLinkClick}>
              {item.title}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Copyright */}
      <div className="mt-14 text-center">
        <div className="flex flex-col gap-1 text-sm text-neutral-700">
            <div className="text-xs text-zinc-500 text-center leading-relaxed">
              © {new Date().getFullYear()}{" "}
              <span className="text-zinc-400 font-medium">
                S RAJ INFRA PROJECTS PRIVATE LIMITED
              </span>
              . All Rights Reserved.
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HoverImageLinks;
