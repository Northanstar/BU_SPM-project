"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Menu, X, User, Calendar, Home, LogIn, UserPlus, Phone, Contact } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Appointment', href: '/Appointment', icon: <Calendar className="h-4 w-4" /> },
  
    { name: 'Contact', href: '/contact', icon: <Contact className="h-4 w-4" /> },
  ];

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-linear-to-r from-blue-600/95 to-blue-800/95 backdrop-blur-sm py-4'
        }
      `}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-12 w-12 rounded-full bg-white p-1">
                <Image
                  src="/download (1).jpeg"
                  alt="MediCare Logo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="hidden md:block">
                <h1 className={`text-xl font-bold ${isScrolled ? 'text-blue-800' : 'text-white'}`}>
                  MediCare<span className="text-blue-400">+</span>
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}>
                  Your Health, Our Priority
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                    ${isScrolled
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-white hover:text-blue-100 hover:bg-white/10'
                    }
                  `}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/Login"
                className={`
                  flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200
                  ${isScrolled
                    ? 'text-blue-600 border border-blue-600 hover:bg-blue-50'
                    : 'text-blue-600 bg-white hover:bg-blue-50'
                  }
                `}
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                href="/Register"
                className="flex items-center space-x-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                md:hidden p-2 rounded-lg transition-colors
                ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}
              `}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="bg-white rounded-xl shadow-lg p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
                
                <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">
                  <Link
                    href="/Login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/Register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Create Account</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Navbar;