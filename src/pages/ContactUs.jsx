"use client";

import React from "react";
import AnimatedHeader from "../components/Header/AnimatedHeader";
import { ContactUsInputField } from "../components/ContactPage/ContactUsInputField";
import ContactInfo from "../components/ContactPage/ContactInfo";
import Layout from "../components/layout/layout";
import { WavyBackground } from "../components/ContactPage/WavyBackground/wavy-background";

export const ContactUs = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden">
        <AnimatedHeader />
        <div className="w-full mx-auto">
          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <WavyBackground />
          </div>
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-8 overflow-hidden px-4 lg:px-0">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <ContactUsInputField />
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 self-start lg:self-center">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
