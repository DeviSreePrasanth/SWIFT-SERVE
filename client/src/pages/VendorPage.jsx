import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/axios";

function VendorPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({}); // Store average ratings for each vendor

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("/vendor");
        setVendors(response.data);

        response.data.forEach((vendor) => {
          axios
            .get(`/review?name=${vendor.name}`)
            .then((res) => {
              const reviews = res.data;
              if (reviews.length > 0) {
                const avgRating =
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length;
                setRatings((prev) => ({ ...prev, [vendor._id]: avgRating }));
              } else {
                setRatings((prev) => ({ ...prev, [vendor._id]: 0 }));
              }
            })
            .catch((error) => {
              console.error(
                `Error fetching reviews for ${vendor.name}:`,
                error
              );
              setRatings((prev) => ({ ...prev, [vendor._id]: 0 }));
            });
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vendors:", err);
        setError("Failed to load vendors. Please try again later.");
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starType = "empty";
      if (rating >= i) {
        starType = "filled";
      } else if (rating >= i - 0.5) {
        starType = "half";
      }
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 inline-block ${
            starType === "filled"
              ? "text-yellow-400"
              : starType === "half"
              ? "text-yellow-400"
              : "text-gray-600"
          }`}
          fill={
            starType === "filled"
              ? "currentColor"
              : starType === "half"
              ? "url(#half)"
              : "none"
          }
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {starType === "half" && (
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <main className="flex-grow">
        <section className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              Our Trusted Professionals
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional service providers you can rely on
            </p>
            <span className="inline-flex mt-4 px-4 py-1.5 bg-gray-800/50 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30 backdrop-blur-sm">
              {vendors.length} found
            </span>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="group bg-gray-800/40 rounded-2xl overflow-hidden shadow-xl border border-gray-700/50 animate-pulse"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-28 w-28 rounded-full bg-gray-700 mb-5"></div>
                      <div className="h-6 rounded mb-4 w-3/4 bg-gray-700"></div>
                      <div className="h-4 rounded mb-2 w-full bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-900/40 border-t border-gray-700/50">
                    <div className="h-4 rounded w-2/3 bg-gray-700 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-gray-800/30 rounded-2xl p-12 text-center border border-gray-700/50 backdrop-blur-md shadow-xl">
              <div className="inline-block p-5 bg-gray-900/50 rounded-full mb-6 border border-cyan-500/20">
                <svg
                  className="w-10 h-10 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Loading Error
              </h3>
              <p className="text-gray-300 max-w-md mx-auto">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 rounded-xl font-medium bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-700 hover:border-cyan-500/50 cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : vendors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vendors.map((vendor) => (
                  <Link
                    to={`/vendor/${vendor._id}`}
                    key={vendor._id}
                    className="group bg-gray-800/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-2 border border-gray-700/50 hover:border-cyan-500/50 backdrop-blur-md"
                  >
                    <div className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-5">
                          <div className="h-28 w-28 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-5xl font-bold text-white group-hover:ring-4 group-hover:ring-cyan-500/40 transition-all">
                            {vendor.name?.charAt(0) || "?"}
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-cyan-500 rounded-full p-2 border-4 border-gray-900">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {vendor.name || "Unnamed Professional"}
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">
                          {vendor.contactEmail}
                        </p>
                        {/* Display Rating */}
                        <div className="flex items-center mt-2">
                          {renderStars(ratings[vendor._id] || 0)}
                          <span className="ml-2 text-gray-400 text-sm">
                            ({(ratings[vendor._id] || 0).toFixed(1)} / 5)
                          </span>
                        </div>
                        {vendor.categories?.length > 0 && (
                          <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {vendor.categories
                              .slice(0, 3)
                              .map((category, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-900/60 text-cyan-300 border border-cyan-500/40"
                                >
                                  {category}
                                </span>
                              ))}
                            {vendor.categories.length > 3 && (
                              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-900/60 text-gray-400 border border-gray-700/40">
                                +{vendor.categories.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-900/40 border-t border-gray-700/50">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center text-sm text-gray-300">
                          <svg
                            className="w-5 h-5 mr-2 text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>
                            {vendor.address || "Location not specified"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/"
                  className="inline-block px-6 py-3 rounded-xl font-medium bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-700 hover:border-cyan-500/50 cursor-pointer"
                >
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-gray-800/30 rounded-2xl p-12 text-center border border-gray-700/50 backdrop-blur-md shadow-xl">
              <div className="inline-block p-5 bg-gray-900/50 rounded-full mb-6 border border-cyan-500/20">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Professionals Available
              </h3>
              <p className="text-gray-300 max-w-md mx-auto">
                We're currently updating our professional listings. Please check
                back soon.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default VendorPage;
