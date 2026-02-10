import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Research', href: '/research' },
    { label: 'Publications', href: '/publications' },
    { label: 'Treatises', href: '/treatises' },
    { label: 'World Models', href: '/world-models' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="absolute top-0 w-full z-50 transition-all duration-300">
      <div className="flex items-start justify-between px-4 sm:px-6 lg:px-8 pt-6">
        {/* Logo - outside black box, aligned with content below */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer shrink-0 pt-2">
          <span className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            BroadFire<span className="text-blue-600">.AI</span>
          </span>
        </Link>

        {/* Nav bar in black box - right aligned */}
        <div className="hidden md:block bg-[#0A0A0A] px-6 py-2.5">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-3 py-1.5 text-sm font-medium transition-colors hover:text-blue-400 ${
                  location.pathname === link.href
                    ? 'text-blue-400 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-white text-[#0A0A0A] px-5 py-2 text-sm font-medium hover:bg-gray-200 transition-all">
              Contact
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden ml-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 mx-4 sm:mx-6 lg:mx-8 mt-2"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === link.href
                    ? 'text-blue-400 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
