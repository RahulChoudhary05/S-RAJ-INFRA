import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Github, Phone, Mail } from 'lucide-react';
import logo from "../../assets/Logo/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-zinc-300 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Info Column */}
          <div className="space-y-6 text-center md:text-left md:items-start">
          <Link to="/"><img
          src={logo}
          alt="Logo"
          className="h-14 md:h-16 cursor-pointer transition-transform duration-300 hover:scale-105"
        /></Link>
          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <Link to="#" className="hover:text-white">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link to="#" className="hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link to="#" className="hover:text-white">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link to="#" className="hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link to="#" className="hover:text-white">
              <Github className="h-5 w-5" />
            </Link>
          </div>
          </div>

          {/* Quick Links Column - Hidden on mobile */}
          <div className="hidden md:block">
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-white">
                  Career Desk
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information and Address Column - Hidden on mobile */}
          <div className="space-y-6 hidden md:block">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Contact Information
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:03340649358" className="hover:text-white">
                    033 4064 9358
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+918777806040" className="hover:text-white">
                    +91-8777806040
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+918910929747" className="hover:text-white">
                    +91-8910929747
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a
                    href="mailto:headoffice@srajinfra.com"
                    className="hover:text-white"
                  >
                    headoffice@srajinfra.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Address</h3>
              <p className="text-sm">
                34A, Metcalfe Street, P.O. Box: 700013, Kolkata, West Bengal
                700013, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-zinc-700">
          <div className="flex flex-col items-center gap-4">
            <nav className="flex flex-wrap justify-center gap-4 text-sm md:hidden">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="text-zinc-500">|</span>
              <Link to="/about" className="hover:text-white">About Us</Link>
              <span className="text-zinc-500">|</span>
              <Link to="/projects" className="hover:text-white">Projects</Link>
              <span className="text-zinc-500">|</span>
              <Link to="/career" className="hover:text-white">Career</Link>
              <span className="text-zinc-500">|</span>
              <Link to="/contactus" className="hover:text-white">Contact Us</Link>
            </nav>
            <div className="text-sm text-zinc-500 text-center">
              2022 S RAJ INFRA PROJECTS PRIVATE LIMITED. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

