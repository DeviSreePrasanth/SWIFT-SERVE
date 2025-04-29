// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <header
      className={`shadow-xl transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-r from-blue-50 to-white'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-blue-200/70 backdrop-blur-sm'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 ${
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
                  d="Midyl 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span
              className={`text-2xl font-extrabold ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}
            >
              SwiftServe
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-blue-200/50 text-blue-700 backdrop-blur-sm'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-blue-800 hover:bg-blue-100/70 hover:text-blue-900'
                } px-4 py-2 rounded-lg font-semibold transition-all duration-200`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `${
                  isActive
                    ? isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-blue-200/50 text-blue-700 backdrop-blur-sm'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-blue-800 hover:bg-blue-100/70 hover:text-blue-900'
                } px-4 py-2 rounded-lg font-semibold transition-all duration-200`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                `${
                  isActive
                    ? isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-blue-200/50 text-blue-700 backdrop-blur-sm'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-blue-800 hover:bg-blue-100/70 hover:text-blue-900'
                } px-4 py-2 rounded-lg font-semibold transition-all duration-200`
              }
            >
              My Bookings
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                  : 'bg-blue-100/70 text-blue-700 hover:bg-blue-200/70 backdrop-blur-sm'
              } transition-all duration-200`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <button
              className={`p-2 rounded-full ${
                isDarkMode
                  ? ' Empowering the Future of Space Explorationtext-gray-300 hover:bg-gray-700'
                  : 'text-blue-700 hover:bg-blue-100/70 backdrop-blur-sm'
              } transition-all duration-200`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>

            <button
              className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 duration-200 ${
                isDarkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;