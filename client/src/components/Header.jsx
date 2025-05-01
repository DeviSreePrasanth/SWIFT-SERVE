import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage
  const user = {
    name: localStorage.getItem('userName') || 'Guest',
    email: localStorage.getItem('userEmail') || 'No email',
    avatar: localStorage.getItem('userAvatar') || '',
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b transition-all duration-300 ${isScrolled ? 'border-gray-700' : 'border-transparent'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/home" 
            className="flex items-center space-x-3 group transition-transform hover:scale-[1.02]"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 group-hover:from-blue-500 group-hover:to-blue-700 transition-all shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
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
            <span className="text-2xl font-bold text-white">
              <span className="text-blue-400">Swift</span>Serve
            </span>
          </Link>

          {/* Search Bar - Visible on medium screens and up */}
          <div className="hidden md:flex flex-1 mx-8 max-w-xl">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search services, professionals..."
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none text-white placeholder-gray-400 transition-all duration-200 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery('')}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>
          </div>

          {/* Navigation and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/services" 
                className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-gray-800/50 px-3 py-1.5 rounded-lg"
              >
                Services
              </Link>
              <Link 
                to="/vendor" 
                className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-gray-800/50 px-3 py-1.5 rounded-lg"
              >
                Professionals
              </Link>
              
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              {/* Cart Icon with badge */}
              <Link 
                to="/cart" 
                className="p-2 relative text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all hover:scale-110"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  3
                </span>
              </Link>

              {/* Profile Icon with Popup */}
              <div className="relative" ref={profileRef}>
                <button
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all hover:scale-110"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-700"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                      <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Profile Popup */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl overflow-hidden p-0 text-white origin-top-right animate-scaleIn">
                    <div className="p-4 bg-gradient-to-r from-blue-900/50 to-gray-800 border-b border-gray-700">
                      <div className="flex items-center space-x-3">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt="Profile" 
                            className="h-10 w-10 rounded-full object-cover border-2 border-white/20"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-white/20">
                            <svg className="h-6 w-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold">{user.name}</div>
                          <div className="text-xs text-gray-300">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link 
                to={`/bookings/${user.name}`}
                className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-700/50 transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                My Bookings
              </Link>
                    </div>
                    <div className="p-2 border-t border-gray-700">
                      <button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-medium py-2 rounded-lg transition-all flex items-center justify-center space-x-2"
                        onClick={handleLogout}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search - Visible only on small screens */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400 transition-colors shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery('')}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;