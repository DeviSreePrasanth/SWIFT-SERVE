import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function ServiceFullPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const service = state?.service;
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!service) navigate('/services');
    else {
      setTimeout(() => setIsLoaded(true), 300); // Smooth intro animation
    }
  }, [service, navigate]);

  const handleAddToCart = () => {
    navigate(`/cart/add/${service.services[0]?._id}`);
  };

  if (!service) return null;

  return (
    <div className="dark bg-gray-900 min-h-screen overflow-hidden">
      <Header />
      
      {/* **Floating Particle Background (Dynamic & Interactive) ** */}
      <div className="fixed inset-0 overflow-hidden z-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              transition: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </div>

      {/* **Main Content (Cinematic Layout) ** */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto px-4 py-16"
      >
        {/* **Hero Section (Glowing Gradient + Parallax Effect) ** */}
        <div className="relative mb-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl -z-10"
            animate={{
              backgroundPosition: isHovered ? "100% 50%" : "0% 50%",
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          />
          
          <div className="text-center">
            <motion.h1 
              className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
              whileHover={{ scale: 1.02 }}
            >
              {service.services[0]?.name || 'Service'}
            </motion.h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powered by <span className="font-bold text-blue-400">{service.name}</span> — Professional Excellence
            </p>
          </div>
        </div>

        {/* **Immersive Content Grid (Asymmetrical Layout) ** */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* **Left Panel (Service Visual + Floating Elements) ** */}
          <motion.div 
            className="relative lg:col-span-2"
            whileHover={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden border-2 border-gray-700/50 backdrop-blur-lg bg-gradient-to-br from-gray-800/50 to-gray-900/70">
              <img
                src={service.services[0]?.imageUrl}
                alt={service.services[0]?.name}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                  <motion.span 
                    className="inline-block px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-sm font-bold text-blue-300 border border-blue-500/30 mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    {service.services[0]?.category || 'Premium Service'}
                  </motion.span>
                  <h2 className="text-3xl font-bold text-white">{service.name}</h2>
                </div>
              </div>
            </div>

            {/* **Floating 3D Tag (Dynamic) ** */}
            <motion.div
              className="absolute -top-6 -right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl z-20"
              initial={{ rotate: -5, y: 20 }}
              animate={{ rotate: [0, -5, 0], y: [20, 0, 20] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="font-bold">⭐ Top Rated</span>
            </motion.div>
          </motion.div>

          {/* **Right Panel (Neon Glass Panel + Interactive Details) ** */}
          <motion.div 
            className="bg-gray-800/30 border-2 border-gray-700/30 rounded-3xl p-8 backdrop-blur-lg shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-lg mr-3">
                🔍
              </span>
              Service Breakdown
            </h3>

            <div className="space-y-6">
              {/* **Dynamic Description (Typewriter Effect) ** */}
              <motion.p 
                className="text-gray-300 leading-relaxed border-l-4 border-blue-500/50 pl-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                {service.services[0]?.description || 'Expert service with precision and care.'}
              </motion.p>

              {/* **Interactive Feature List (Hover Effects) ** */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  "✅ 24/7 Emergency Support",
                  "✅ Licensed & Certified",
                  "✅ 1-Year Warranty",
                  "✅ Free Consultation",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-xl cursor-pointer transition-all border border-gray-700/30"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-blue-400 mr-3">→</span>
                    <span className="text-gray-200">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* **Action Buttons (Glow on Hover) ** */}
              <div className="flex flex-col space-y-4 mt-8">
                <motion.button
                  onClick={handleAddToCart}
                  className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🛒 Add to Cart
                </motion.button>

                <motion.button
                  onClick={() => navigate(-1)}
                  className="px-6 py-4 bg-gray-800/70 text-gray-300 border border-gray-700/50 rounded-xl hover:bg-gray-700/50 transition-all flex items-center justify-center"
                  whileHover={{ x: 3 }}
                >
                  ↩ Back to Services
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* **Vendor Details (Holographic Panel) ** */}
        <motion.div 
          className="mt-20 bg-gradient-to-br from-gray-800/40 to-gray-900/60 border-2 border-gray-700/20 rounded-3xl p-8 backdrop-blur-lg shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                {service.name.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-gray-900">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
              <p className="text-gray-400 mb-4">Professional since {new Date(service.createdAt).getFullYear()}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {service.categories.map((cat, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-500/30">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/30">
                  <p className="text-gray-400 text-sm">Contact</p>
                  <p className="text-white font-medium">{service.phone}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/30">
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-medium">{service.contactEmail}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/30">
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-medium">{service.address}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default ServiceFullPage;