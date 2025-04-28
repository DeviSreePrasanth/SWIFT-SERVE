// users/user-services/VendorRatings.jsx
import React, { useState, useEffect } from 'react';

function VendorRatings({ vendorId }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // Simulate fetching ratings data from backend (replace with API call)
    const mockRatings = {
      1: [
        { id: 1, rating: 4.5, comment: 'Great service, very professional!', user: 'User A', date: '2025-04-20' },
        { id: 2, rating: 4.0, comment: 'Good work, but a bit late.', user: 'User B', date: '2025-04-18' },
      ],
      2: [
        { id: 3, rating: 5.0, comment: 'Excellent job, highly recommend!', user: 'User C', date: '2025-04-15' },
      ],
    };
    const vendorRatings = mockRatings[vendorId] || [];
    setRatings(vendorRatings);
  }, [vendorId]);

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Vendor Ratings & Reviews</h3>
      {ratings.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {ratings.map((rating) => (
            <div key={rating.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{rating.user}</span>
                <span className="text-yellow-500">{rating.rating} ★</span>
              </div>
              <p className="text-gray-600">{rating.comment}</p>
              <p className="text-sm text-gray-500 mt-1">Posted on: {rating.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorRatings;