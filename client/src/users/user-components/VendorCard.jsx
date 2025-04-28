import React from 'react';

const VendorCard = ({ name, picture, experience, rating, pricing, onBookNow }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img
                src={picture}
                alt={name}
                className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
                <p className="text-slate-600">Experience: {experience} years</p>
                <p className="text-slate-600">Rating: {rating}/5</p>
                <p className="text-slate-600">Starting at: ${pricing}</p>
            </div>
            <button
                onClick={onBookNow}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                Book Now
            </button>
        </div>
    );
};

export default VendorCard;