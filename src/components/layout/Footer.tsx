import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-secondary pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Book className="h-6 w-6 text-accent mr-2" />
              <span className="text-lg font-semibold text-text-dark">AuCourses</span>
            </div>
            <p className="text-text-medium text-sm leading-relaxed mb-4">
              Honest course reviews by students, for students. Find the best courses and professors for your academic journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-medium hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-text-medium hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-text-medium hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-text-dark font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-medium hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-text-medium hover:text-accent transition-colors">
                  Academic Catalog
                </Link>
              </li>
              <li>
                <Link to="/professors" className="text-text-medium hover:text-accent transition-colors">
                  Professors
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-text-medium hover:text-accent transition-colors">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-text-dark font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-medium hover:text-accent transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-text-medium hover:text-accent transition-colors">
                  University Directory
                </a>
              </li>
              <li>
                <a href="#" className="text-text-medium hover:text-accent transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-text-medium hover:text-accent transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-text-dark font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-medium hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-text-medium hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-text-medium hover:text-accent transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-text-medium hover:text-accent transition-colors">
                  Content Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-text-medium text-sm text-center">
            © {new Date().getFullYear()} AuCourses. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;