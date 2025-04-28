Swift Serve 

backend routes

base url-http://localhost:5000/

/api/auth - authRoutes-authController
Authentication

/api/services - servicesRoute-servicesController
---/                                get all services available
---/category/:categoryname          filter services by category

/api/cart - cartRoutes - cartController require userid as params
---post - /                          add to cart
---get - /                           get cart

/api/bookings - bookingRoutes - bookingController require userid as params
---post - /                          post bookings 
---get - /                           get bookings


/api/vendor - vendorRoutes - vendorController
---post /                                details post vendor details to vendor schema 

/api/admin - approvalRoute
--- /pending-vendors  retreive all pending vendors

