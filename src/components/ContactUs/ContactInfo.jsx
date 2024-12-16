'use client'

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card, CardContent } from "../F&Q/ui/card";
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="min-h-[50%] bg-gradient-to-b from-richblack-5 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight font-playfair text-backgroundblack sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <div className="prose prose-lg mx-auto text-zinc-800 font-playfair font-semibold">
            <p className="leading-normal">
              We're here to help and answer any question you might have. We look forward to hearing from you.
              Whether you're curious about our services, a potential collaboration, or just want to say hello,
              don't hesitate to reach out. Your inquiries are important to us, and we strive to respond as
              quickly as possible.
            </p>
          </div>
        </div>

        {/* Contact Info Accordion */}
        <Card className="border-none shadow-xl">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {/* General Contact Section */}
              <AccordionItem value="general-contact" className="border-spacing-6">
                <AccordionTrigger className="bg-gradient-to-r from-blue-25 to-richblack-5 text-black px-6 py-4 hover:no-underline data-[state=open]:bg-gradient-to-r data-[state=open]:from-richblack-5 data-[state=open]:to-blue-25 rounded-t-lg">
                  <span className="text-xl font-semibold font-inter">General Contact Information</span>
                </AccordionTrigger>
                <AccordionContent className="bg-transparent px-6 py-4 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-6 w-6 text-richblue-800" />
                      <div>
                        <h3 className="text-lg font-semibold text-richblue-800 font-playfair">Email</h3>
                        <p className="text-richblack-900 font-medium">headoffice@srajinfra.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Phone className="h-6 w-6 text-richblue-800" />
                      <div>
                        <h3 className="text-lg font-semibold text-richblue-800 font-playfair">Phone</h3>
                        <p className="text-richblack-900 font-medium">033 4064 9358</p>
                        <p className="text-richblack-900 font-medium">+91-8777806040</p><p className="text-richblack-900 font-medium">+91-8910929747</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 sm:col-span-2">
                      <MapPin className="h-6 w-6 text-richblue-800" />
                      <div>
                        <h3 className="text-lg font-semibold text-richblue-800 font-playfair">Address</h3>
                        <p className="text-richblack-900 font-medium">34A, Metcalfe Street, P.O. Box: 700013, Kolkata, West Bengal 700013, India</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Department Contacts Section */}
              <AccordionItem value="department-contacts" className="border-spacing-6">
                <AccordionTrigger className="bg-gradient-to-r from-blue-25 to-richblack-5 text-black px-6 py-4 hover:no-underline data-[state=open]:bg-gradient-to-r data-[state=open]:from-richblack-5 data-[state=open]:to-blue-25">
                  <span className="text-xl font-semibold font-inter">Department Contacts</span>
                </AccordionTrigger>
                <AccordionContent className="bg-transparent px-6 py-4 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">Sales Department</h3>
                      <p className="text-richblack-900 font-medium">sales@example.com</p>
                      <p className="text-richblack-900 font-medium">+1 (123) 456-7891</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">Customer Support</h3>
                      <p className="text-richblack-900 font-medium">support@example.com</p>
                      <p className="text-richblack-900 font-medium">+1 (123) 456-7892</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">Human Resources</h3>
                      <p className="text-richblack-900 font-medium">hr@example.com</p>
                      <p className="text-richblack-900 font-medium">+1 (123) 456-7893</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">Media Inquiries</h3>
                      <p className="text-richblack-900 font-medium">media@example.com</p>
                      <p className="text-richblack-900 font-medium">+1 (123) 456-7894</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

