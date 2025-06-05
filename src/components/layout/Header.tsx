import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // noop for now, reserved for future scroll effects
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Header */}
      <header 
        className="sticky top-0 z-50 w-full bg-white border-b border-[#E8E7E4]"
      >
        <div className="max-w-[1100px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-[#3D5B48]" strokeWidth={1.5} />
            <span className="text-[22px] font-playfair font-semibold text-[#3D5B48]">AuCourses</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-[15px] font-medium transition-colors hover:text-[#3D5B48] text-[#1F1F1F] ${
                location.pathname === '/' ? 'text-[#3D5B48]' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/majors" 
              className={`text-[15px] font-medium transition-colors hover:text-[#3D5B48] text-[#1F1F1F] ${
                location.pathname.startsWith('/majors') ? 'text-[#3D5B48]' : ''
              }`}
            >
              Academic Catalog
            </Link>
            <Link 
              to="/professors" 
              className={`text-[15px] font-medium transition-colors hover:text-[#3D5B48] text-[#1F1F1F] ${
                location.pathname === '/professors' ? 'text-[#3D5B48]' : ''
              }`}
            >
              Professors
            </Link>
            <Link 
              to="/forum" 
              className={`text-[15px] font-medium transition-colors hover:text-[#3D5B48] text-[#1F1F1F] ${
                location.pathname === '/forum' ? 'text-[#3D5B48]' : ''
              }`}
            >
              Forum
            </Link>
            <Link 
              to="/signin" 
              className="px-4 h-[42px] flex items-center rounded-lg bg-[#728775] text-white text-[15px] font-medium transition-all hover:bg-[#657769]"
            >
              Sign In
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-text-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium py-2 transition-colors hover:text-accent ${
                  location.pathname === '/' ? 'text-accent' : 'text-text-dark'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/majors" 
                className={`font-medium py-2 transition-colors hover:text-accent ${
                  location.pathname.startsWith('/majors') ? 'text-accent' : 'text-text-dark'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Academic Catalog
              </Link>
              <Link 
                to="/professors" 
                className={`font-medium py-2 transition-colors hover:text-accent ${
                  location.pathname === '/professors' ? 'text-accent' : 'text-text-dark'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Professors
              </Link>
              <Link 
                to="/forum" 
                className={`font-medium py-2 transition-colors hover:text-accent ${
                  location.pathname === '/forum' ? 'text-accent' : 'text-text-dark'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Forum
              </Link>
              <Link 
                to="/signin" 
                className="px-4 py-2 rounded-md bg-accent text-white font-medium transition-all hover:bg-opacity-90 inline-block w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;