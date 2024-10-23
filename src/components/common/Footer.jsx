import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from "../../assets/Logo/logo.svg"; 

export default function AnimatedFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer className="bg-richblack-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="mb-8 md:mb-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: isVisible ? 1 : 0 }}>
            <a href="/" className="flex items-center">
              <span className="sr-only">S RAJ INFRA PROJECTS PRIVATE LIMITED</span>
              <img src={logo} alt="S RAJ INFRA PROJECTS PRIVATE LIMITED Logo" className="w-20 h-20 block md:hidden" /> {/* Visible on smaller screens only */}
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center font-playfair font-bold text-lg md:text-left">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-caribbeangreen-500 transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-caribbeangreen-500 transition-colors">About Us</a></li>
                <li><a href="/projects" className="hover:text-caribbeangreen-500 transition-colors">Projects</a></li>
                <li><a href="/careers" className="hover:text-caribbeangreen-500 transition-colors">Career Desk</a></li>
                <li><a href="/contact" className="hover:text-caribbeangreen-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-center md:justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>033 4064 9358</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91-8777806040</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91-8910929747</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:headoffice@srajinfra.com" className="hover:text-caribbeangreen-500 transition-colors">headoffice@srajinfra.com</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Address</h3>
              <p className="flex items-center justify-center md:justify-start">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>34A, Metcalfe Street, P.O. Box: 700013, Kolkata, West Bengal 700013, India</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} S RAJ INFRA PROJECTS PRIVATE LIMITED. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
