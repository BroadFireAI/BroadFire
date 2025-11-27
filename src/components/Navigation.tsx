import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Research', href: '/#research' },
    { label: 'Publications', href: '/#publications' },
    { label: 'Team', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ];

  const isHashLink = (href: string) => href.includes('#');

  return (
    <nav
      className="absolute top-0 w-full z-50 transition-all duration-300 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors border border-gray-200">
              <Terminal className="text-orange-600 w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-gray-900">
              BroadFire<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">.Ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                isHashLink(link.href) ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 ${location.pathname === link.href ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Join Us
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-black hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              isHashLink(link.href) ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.href ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;