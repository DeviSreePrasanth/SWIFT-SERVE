import React from 'react';

const Sidebar = ({ activePage, setActivePage }) => {
    const pages = [
        { name: 'All Services', icon: 'fa-concierge-bell', id: 'service-listing' },
        { name: 'Services by Category', icon: 'fa-list', id: 'service-category' },
        { name: 'Vendors', icon: 'fa-users', id: 'vendor-list' },
        { name: 'Vendor Profile', icon: 'fa-user', id: 'vendor-profile' },
        { name: 'Vendor Availability', icon: 'fa-calendar', id: 'vendor-availability' },
        { name: 'Service Details', icon: 'fa-info-circle', id: 'service-details' },
        { name: 'Cart', icon: 'fa-shopping-cart', id: 'cart' },
        { name: 'Checkout', icon: 'fa-credit-card', id: 'checkout' },
        { name: 'Booking History', icon: 'fa-history', id: 'booking-history' },
        { name: 'Leave Review', icon: 'fa-star', id: 'leave-review' },
        { name: 'Vendor Ratings', icon: 'fa-chart-line', id: 'vendor-ratings' },
        { name: 'Search Services', icon: 'fa-search', id: 'search-services' },
        { name: 'Filter Vendors', icon: 'fa-filter', id: 'filter-vendors' },
    ];

    return (
        <aside className="w-64 bg-white shadow-lg h-screen fixed transition-all duration-300">
            <div className="p-6 border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800">Service Marketplace</h1>
            </div>
            <nav className="mt-4">
                <ul>
                    {pages.map((page) => (
                        <li key={page.id}>
                            <button
                                onClick={() => setActivePage(page.id)}
                                className={`flex items-center w-full px-6 py-3 text-slate-700 hover:bg-blue-600 hover:text-white transition-colors duration-200 ease-in-out ${
                                    activePage === page.id ? 'bg-blue-600 text-white' : ''
                                }`}
                            >
                                <i className={`fas ${page.icon} mr-3`}></i>
                                <span>{page.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;