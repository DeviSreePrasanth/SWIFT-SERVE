import React, { useState } from 'react';

const CartItem = ({ service, vendor, date, price, onRemove }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleRemove = () => {
        setShowConfirm(true);
    };

    const confirmRemove = () => {
        onRemove();
        setShowConfirm(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center border-b border-slate-200 transition-all duration-300">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">{service}</h3>
                <p className="text-slate-600">Vendor: {vendor}</p>
                <p className="text-slate-600">Date: {date}</p>
            </div>
            <div className="flex items-center space-x-4">
                <p className="text-lg font-semibold text-slate-800">${price}</p>
                <button
                    onClick={handleRemove}
                    className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full animate-fade-in">
                        <h3 className="text-lg font-semibold text-slate-800">Remove Item</h3>
                        <p className="text-slate-600 mt-2">Are you sure you want to remove {service} from your cart?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 text-slate-600 hover:text-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRemove}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItem;