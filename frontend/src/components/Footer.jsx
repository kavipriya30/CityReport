import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-sm opacity-90">
              A transparent platform for citizens to report and track public infrastructure issues.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-90 hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/report" className="opacity-90 hover:opacity-100">
                  Report Issue
                </Link>
              </li>
              <li>
                <Link to="/track" className="opacity-90 hover:opacity-100">
                  Track Issue
                </Link>
              </li>
              <li>
                <Link to="/login" className="opacity-90 hover:opacity-100">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Email: support@publicissue.gov</li>
              <li>Phone: 1800-123-4567</li>
              <li>Address: City Hall, Main Street</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100"
              >
                Facebook
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Public Issue Reporting System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;