"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { WavyBackground } from "./WavyBackground/wavy-background";


const ContactInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      className="relative flex flex-col items-center p-4 sm:p-5 md:p-7 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black rounded-xl shadow-lg max-w-md mx-auto space-y-4 sm:space-y-6 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <WavyBackground/>
        </div>
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 absolute top-0 left-0"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-br from-pink-500 to-red-600 rounded-full blur-2xl opacity-30 absolute bottom-0 right-0"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      {/* Title Section */}
      <motion.div
        className="w-full text-center space-y-2 sm:space-y-4"
        variants={itemVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          Get in Touch
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          We are here to assist you. Reach out to us anytime, and we’ll respond as soon as possible.
        </p>
      </motion.div>

      {/* Contact Details Section */}
      <motion.div
        className="w-full flex flex-col space-y-4 sm:space-y-6"
        variants={containerVariants}
      >
        {/* Phone Section */}
        <motion.div
          className="flex items-center space-x-4 bg-white dark:bg-gray-800 bg-opacity-80 p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          variants={itemVariants}
        >
          <PhoneIcon className="w-8 h-8 text-zinc-800 dark:text-blue-400" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Phone Numbers</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">033 4064 9358</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">+91-8777806040</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">+91-8910929747</p>
          </div>
        </motion.div>

        {/* Email Section */}
        <motion.div
          className="flex items-center space-x-4 bg-white dark:bg-gray-800 bg-opacity-80 p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          variants={itemVariants}
        >
          <EnvelopeIcon className="w-8 h-8 text-zinc-800" />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Email Address</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">headoffice@srajinfra.com</p>
          </div>
        </motion.div>

        {/* Address Section */}
        <motion.div
          className="flex items-start space-x-4 bg-white dark:bg-gray-800 bg-opacity-80 p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          variants={itemVariants}
        >
          <MapPinIcon className="w-8 h-8 text-zinc-800" />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Our Address</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">34A, Metcalfe Street,</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">P.O. Box: 700013,</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Kolkata, West Bengal 700013,</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">India</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
