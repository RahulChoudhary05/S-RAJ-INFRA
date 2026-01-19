"use client";

import { useState } from "react";
import { Plus, Minus, Mail, Phone, MapPin, Building2, Users, Headphones, Newspaper } from "lucide-react";

export const ContactInfo = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const contactSections = [
    {
      id: "01",
      title: "General Contact Information",
      content: (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-start space-x-4">
            <Mail className="h-6 w-6 text-zinc-800 mt-1" />
            <div>
              <h3 className="text-lg font-semibold font-playfair text-gray-900">Email</h3>
              <a
                href="mailto:headoffice@srajinfra.com"
                className="text-gray-600 font-medium hover:text-zinc-800 transition-colors"
              >
                headoffice@srajinfra.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="h-6 w-6 text-zinc-800 mt-1" />
            <div>
              <h3 className="text-lg font-semibold font-playfair text-gray-900">Phone</h3>
              <div className="space-y-1">
                <a href="tel:03340649358" className="block text-gray-600 font-medium hover:text-zinc-800">
                  033 4064 9358
                </a>
                <a href="tel:+918777806040" className="block text-gray-600 font-medium hover:text-zinc-800">
                  +91-8777806040
                </a>
                <a href="tel:+918910929747" className="block text-gray-600 font-medium hover:text-zinc-800">
                  +91-8910929747
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4 sm:col-span-2">
            <MapPin className="h-6 w-6 text-zinc-800 mt-1" />
            <div>
              <h3 className="text-lg font-semibold font-playfair text-gray-900">Address</h3>
              <a
                href="https://maps.google.com/?q=34A+Metcalfe+Street+Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 font-medium hover:text-zinc-800"
              >
                34A, Metcalfe Street, P.O. Box: 700013, Kolkata, West Bengal 700013, India
              </a>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "02",
      title: "Department Contacts",
      content: (
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { Icon: Building2, title: "Sales Department", email: "sales@srajinfra.com", phone: "+91-8777806040" },
            { Icon: Headphones, title: "Customer Support", email: "support@srajinfra.com", phone: "+91-8910929747" },
            { Icon: Users, title: "Human Resources", email: "hr@srajinfra.com", phone: "033 4064 9358" },
            { Icon: Newspaper, title: "Media Inquiries", email: "media@srajinfra.com", phone: "+91-8777806040" },
          ].map((dept, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center space-x-3">
                <dept.Icon className="h-5 w-5 text-zinc-800" />
                <h3 className="text-lg font-semibold font-playfair text-gray-900">{dept.title}</h3>
              </div>
              <div className="pl-8 space-y-1">
                <a href={`mailto:${dept.email}`} className="block text-gray-600 font-medium hover:text-zinc-800">
                  {dept.email}
                </a>
                <a href={`tel:${dept.phone}`} className="block text-gray-600 font-medium hover:text-zinc-800">
                  {dept.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const toggleSection = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-zinc-800 bg-opacity-10 border border-[#866A04] text-zinc-800">
          <Mail className="h-4 w-4 mr-2" />
          CONTACT INFORMATION
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We're here to help and answer any questions you might have. Whether you're curious about our services,
          opportunities, or just want to connect — reach out!
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-6">
        {contactSections.map((section, index) => (
          <div
            key={section.id}
            className={`border-b border-neutral-200 pb-6 transition-all duration-300 ${
              openIndex === index ? "bg-neutral-50 rounded-lg p-6 -mx-6 shadow-sm" : "p-6 -mx-6"
            }`}
          >
            <button
              onClick={() => toggleSection(index)}
              className="w-full text-left flex items-start justify-between focus:outline-none group"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-playfair text-zinc-800">{section.id}</span>
                <h3 className="text-xl font-medium text-neutral-950 group-hover:text-zinc-800 transition-colors">
                  {section.title}
                </h3>
              </div>
              <span
                className={`ml-6 flex-shrink-0 mt-1 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                {openIndex === index ? (
                  <div className="h-6 w-6 rounded-full bg-zinc-800 text-white flex items-center justify-center">
                    <Minus size={14} />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center group-hover:bg-zinc-800 group-hover:text-white transition-colors">
                    <Plus size={14} />
                  </div>
                )}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openIndex === index ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-10 pr-6 text-neutral-600">
                <p className="whitespace-pre-line">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
