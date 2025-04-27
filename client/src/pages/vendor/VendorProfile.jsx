import React, { useState, useEffect } from 'react';
   import { FaStar, FaEdit, FaIdCard, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
   import { useLocation } from 'react-router-dom';

   const VendorProfile = () => {
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const initialEditMode = queryParams.get('edit') === 'true';

     const [isEditing, setIsEditing] = useState(initialEditMode);
     const [vendorDetails, setVendorDetails] = useState({
       name: 'John Doe',
       email: 'john.doe@example.com',
       phone: '+1 234 567 8900',
       address: '123 Vendor Street, City, Country',
       idProof: 'DL-123456789',
       profilePhoto: '/profile.jpg', // Public folder path
       ratings: 4.5,
       reviews: 120,
     });

     useEffect(() => {
       setIsEditing(initialEditMode);
     }, [initialEditMode]);

     const handleEditToggle = () => {
       setIsEditing(!isEditing);
     };

     const handleInputChange = (e) => {
       const { name, value } = e.target;
       setVendorDetails((prev) => ({ ...prev, [name]: value }));
     };

     const handleFileChange = (e) => {
       const file = e.target.files[0];
       if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
           setVendorDetails((prev) => ({ ...prev, profilePhoto: reader.result }));
         };
         reader.readAsDataURL(file); // Convert image to base64 for preview
         console.log('File selected:', file);
         // Add backend upload logic here if needed
       }
     };

     const handleSave = () => {
       setIsEditing(false);
       // Add logic to save updated details to backend
     };

     return (
       <div className="min-h-screen bg-gray-100 p-6">
         {/* Vendor Profile Card */}
         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
           <h1 className="text-2xl font-bold text-gray-800 mb-6">Vendor Profile</h1>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Profile Photo */}
             <div className="flex flex-col items-center">
               <img
                 src={vendorDetails.profilePhoto}
                 alt="Profile"
                 className="w-32 h-32 rounded-full object-cover mb-4"
                 onError={(e) => {
                   console.error('Image failed to load:', vendorDetails.profilePhoto);
                   e.target.src = 'https://via.placeholder.com/150'; // Fallback image
                 }}
               />
               {isEditing && (
                 <input
                   type="file"
                   accept="image/*"
                   className="text-sm text-gray-600"
                   onChange={handleFileChange}
                 />
               )}
             </div>

             {/* Vendor Details */}
             <div className="col-span-2 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-600">Name</label>
                 {isEditing ? (
                   <input
                     type="text"
                     name="name"
                     value={vendorDetails.name}
                     onChange={handleInputChange}
                     className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                   />
                 ) : (
                   <p className="mt-1 text-lg text-gray-800">{vendorDetails.name}</p>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-600">Email</label>
                 {isEditing ? (
                   <input
                     type="email"
                     name="email"
                     value={vendorDetails.email}
                     onChange={handleInputChange}
                     className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                   />
                 ) : (
                   <p className="mt-1 text-lg text-gray-800">{vendorDetails.email}</p>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-600">Phone</label>
                 {isEditing ? (
                   <input
                     type="text"
                     name="phone"
                     value={vendorDetails.phone}
                     onChange={handleInputChange}
                     className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                   />
                 ) : (
                   <p className="mt-1 text-lg text-gray-800 flex items-center">
                     <FaPhone className="mr-2" /> {vendorDetails.phone}
                   </p>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-600">Address</label>
                 {isEditing ? (
                   <input
                     type="text"
                     name="address"
                     value={vendorDetails.address}
                     onChange={handleInputChange}
                     className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                   />
                 ) : (
                   <p className="mt-1 text-lg text-gray-800 flex items-center">
                     <FaMapMarkerAlt className="mr-2" /> {vendorDetails.address}
                   </p>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-600">ID Proof</label>
                 {isEditing ? (
                   <input
                     type="text"
                     name="idProof"
                     value={vendorDetails.idProof}
                     onChange={handleInputChange}
                     className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                   />
                 ) : (
                   <p className="mt-1 text-lg text-gray-800 flex items-center">
                     <FaIdCard className="mr-2" /> {vendorDetails.idProof}
                   </p>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-600">Ratings</label>
                 <p className="mt-1 text-lg text-gray-800 flex items-center">
                   <FaStar className="mr-2 text-yellow-400" /> {vendorDetails.ratings} ({vendorDetails.reviews} reviews)
                 </p>
               </div>
             </div>
           </div>

           <div className="mt-6 flex justify-end">
             <button
               onClick={handleEditToggle}
               className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
             >
               <FaEdit /> <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
             </button>
             {isEditing && (
               <button
                 onClick={handleSave}
                 className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
               >
                 Save Changes
               </button>
             )}
           </div>
         </div>
       </div>
     );
   };

   export default VendorProfile;