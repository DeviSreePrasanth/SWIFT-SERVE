import React from 'react';

const ServiceCard = ({ title, description, icon, onViewDetails }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <i className={`fas ${icon} text-4xl text-blue-600 mb-4`}></i>
            <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
            <p className="mt-2 text-slate-600">{description}</p>
            <button
                onClick={onViewDetails}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                View Details
            </button>
        </div>
    );
};

export default ServiceCard;