"use client"

import React from "react"
import AnimatedHeader from "../components/Header/AnimatedHeader"
import { ContactUsInputField } from "../components/ContactPage/ContactUsInputField"
import ContactInfo from "../components/ContactPage/ContactInfo"
import Layout from "../components/layout/layout"
import { WavyBackground } from "../components/ContactPage/WavyBackground/wavy-background";

export const ContactUs = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <AnimatedHeader />
        <div className="container mx-auto">
            {/* Background */}
        <div className="absolute inset-0 -z-10">
          <WavyBackground/>
        </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <ContactUsInputField />
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
