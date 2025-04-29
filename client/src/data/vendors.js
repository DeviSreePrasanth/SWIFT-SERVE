export const vendors = {
    1: [
      {
        id: 101,
        name: "AquaFlow Plumbing",
        rating: 4.9,
        reviews: 128,
        experience: "12 years",
        image: "/assets/vendors/plumber1.jpg",
        bio: "Specialized in emergency plumbing with quick response times. Licensed and insured.",
        services: ["Leak repair", "Pipe replacement", "Drain cleaning", "Fixture installation"],
        certifications: ["Master Plumber License", "EPA Certified"],
        responseTime: "15-30 mins",
        priceRange: "$$",
        reviewsList: [
          { user: "Sarah K.", rating: 5, comment: "Fixed my burst pipe in the middle of the night! Lifesaver!" },
          { user: "Michael T.", rating: 4, comment: "Professional and efficient service." }
        ]
      },
      {
        id: 102,
        name: "Pipe Masters Inc.",
        rating: 4.7,
        reviews: 86,
        experience: "8 years",
        image: "/assets/vendors/plumber2.jpg",
        bio: "Family-owned plumbing business focused on quality and customer satisfaction.",
        services: ["Water heater installation", "Sewer line repair", "Bathroom plumbing"],
        certifications: ["Journeyman Plumber"],
        responseTime: "1-2 hours",
        priceRange: "$$",
        reviewsList: [
          { user: "David L.", rating: 5, comment: "Great work on my bathroom remodel!" }
        ]
      }
    ],
    2: [
      {
        id: 201,
        name: "BrightSpark Electric",
        rating: 4.8,
        reviews: 112,
        experience: "15 years",
        image: "/assets/vendors/electrician1.jpg",
        bio: "Full-service electrical contractors for residential and commercial projects.",
        services: ["Wiring upgrades", "Panel replacement", "Lighting installation", "Generator hookup"],
        certifications: ["Master Electrician", "OSHA Certified"],
        responseTime: "30-60 mins",
        priceRange: "$$$",
        reviewsList: [
          { user: "Jennifer M.", rating: 5, comment: "Fixed our faulty wiring quickly and safely." },
          { user: "Robert P.", rating: 5, comment: "Excellent service for our kitchen remodel." }
        ]
      }
    ],
    // Similar structure for other services
  };