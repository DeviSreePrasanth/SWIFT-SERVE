import React, { useState } from 'react';

const ReviewForm = ({ vendorName, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (rating === 0) newErrors.rating = 'Please select a rating';
        if (!review.trim()) newErrors.review = 'Please write a review';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            setSubmitStatus({ type: 'error', message: 'Please complete all fields' });
            return;
        }

        onSubmit({ rating, review });
        setRating(0);
        setReview('');
        setHoverRating(0);
        setErrors({});
        setSubmitStatus({ type: 'success', message: 'Review submitted successfully!' });

        // Clear status message after 3 seconds
        setTimeout(() => setSubmitStatus(null), 3000);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full relative">
            <h3 className="text-xl font-semibold text-slate-800">Review {vendorName}</h3>
            <div className="mt-4">
                <label className="text-slate-600">Rating</label>
                <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className={`text-2xl transition-colors duration-200 ${
                                star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-slate-300'
                            }`}
                        >
                            <i className="fas fa-star"></i>
                        </button>
                    ))}
                </div>
                {errors.rating && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.rating}</p>
                )}
            </div>
            <div className="mt-4">
                <label className="text-slate-600">Your Review</label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className={`w-full mt-2 p-3 border ${
                        errors.review ? 'border-red-500' : 'border-slate-200'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200`}
                    rows="4"
                    placeholder="Write your review here..."
                ></textarea>
                {errors.review && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.review}</p>
                )}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                Submit Review
            </button>
            {submitStatus && (
                <div
                    className={`absolute top-4 right-4 p-3 rounded-lg text-sm animate-fade-in ${
                        submitStatus.type === 'success'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {submitStatus.message}
                </div>
            )}
        </div>
    );
};

export default ReviewForm;