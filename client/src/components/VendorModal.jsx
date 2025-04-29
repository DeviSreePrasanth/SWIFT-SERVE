import { useState } from 'react';
import { generateTimeSlots } from '../data/timeSlots';

const VendorModal = ({ vendor, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  
  const timeSlots = generateTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !address) return;
    
    onConfirm({
      vendor,
      dateTime: `${selectedDate} at ${selectedTime}`,
      address,
      notes
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{vendor.name}</h2>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-600">{vendor.rating} ({vendor.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-3">About {vendor.name}</h3>
                <p className="text-gray-700 mb-4">{vendor.bio}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Services Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {vendor.services.map((service, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Experience</h4>
                    <p>{vendor.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Response Time</h4>
                    <p>{vendor.responseTime}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Price Range</h4>
                    <p>{vendor.priceRange}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Certifications</h4>
                    <p>{vendor.certifications.join(', ')}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Customer Reviews</h3>
                {vendor.reviewsList.map((review, index) => (
                  <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 font-semibold">{review.user}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-1">
              <form onSubmit={handleSubmit} className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                <h3 className="font-bold text-lg mb-4 text-primary-800">Book This Service</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                  <select
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">Choose a date</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot.date}>{slot.date}</option>
                    ))}
                  </select>
                </div>
                
                {selectedDate && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Times</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots
                        .find(slot => slot.date === selectedDate)
                        ?.times.map((time, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedTime(time.display)}
                            className={`p-2 text-sm rounded-md border ${
                              selectedTime === time.display 
                                ? 'bg-primary-600 text-white border-primary-600' 
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {time.display}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full address"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific details about the job..."
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || !address}
                    className={`w-full py-3 px-4 rounded-md font-bold ${
                      selectedDate && selectedTime && address
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition`}
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorModal;