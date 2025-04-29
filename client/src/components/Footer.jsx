// src/components/Footer.jsx
import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className={`pt-12 pb-6 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-800'
          : 'bg-gradient-to-t from-blue-50 to-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div
                className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-blue-200/70 backdrop-blur-sm'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-700'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span
                className={`text-xl font-extrabold ${
                  isDarkMode ? 'text-white' : 'text-blue-900'
                }`}
              >
                SwiftServe
              </span>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Professional home services at your fingertips. Quality guaranteed.
            </p>
          </div>

          <div>
            <h4
              className={`font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {['Plumbing', 'Electrical', 'Cleaning', 'AC Repair'].map(
                (service) => (
                  <li key={service}>
                    <a
                      href={`/services/${service.toLowerCase()}`}
                      className={`transition duration-200 ${
                        isDarkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-700 hover:text-blue-700 font-medium'
                      }`}
                    >
                      {service}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4
              className={`font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}
            >
              Company
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className={`transition duration-200 ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-700 hover:text-blue-700 font-medium'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className={`font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}
            >
              Connect With Us
            </h4>
            <p
              className={`mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              Follow us on social media for updates and offers
            </p>
            <div className="flex space-x-4">
              {[
                {
                  name: 'Facebook',
                  icon: (
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  ),
                },
                {
                  name: 'Instagram',
                  icon: (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.735 0 8.332.013 7.052.07 5.766.128 4.326.393 3.149 1.57 1.972 2.747 1.707 4.187 1.649 5.473c-.057 1.28-.07 1.683-.07 4.948s.013 3.668.07 4.948c.058 1.286.323 2.726 1.5 3.903 1.177 1.177 2.617 1.442 3.903 1.5 1.28.057 1.683.07 4.948.07s3.668-.013 4.948-.07c1.286-.058 2.726-.323 3.903-1.5 1.177-1.177 1.442-2.617 1.5-3.903.057-1.28.07-1.683.07-4.948s-.013-3.668-.07-4.948c-.058-1.286-.323-2.726-1.5-3.903-1.177-1.177-2.617-1.442-3.903-1.5C15.668.013 15.265 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                  ),
                },
                {
                  name: 'Twitter',
                  icon: (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  ),
                },
                {
                  name: 'LinkedIn',
                  icon: (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={`https://${social.name.toLowerCase()}.com`}
                  aria-label={`Follow us on ${social.name}`}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                      : 'bg-blue-100/70 text-blue-700 hover:bg-blue-200/70 backdrop-blur-sm hover:text-blue-800'
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`border-t mt-12 pt-6 text-center ${
            isDarkMode ? 'border-gray-800' : 'border-blue-200'
          }`}
        >
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} SwiftServe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;