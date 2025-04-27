import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getServices = () => axios.get(`${API_URL}/services`);
export const getServicesByCategory = (category) => axios.get(`${API_URL}/services/category/${category}`);
export const addToCart = (data) => axios.post(`${API_URL}/cart`, data);
export const getCart = (userId) => axios.get(`${API_URL}/cart?userId=${userId}`);
export const createBooking = (data) => axios.post(`${API_URL}/bookings`, data);
export const getBookings = (userId) => axios.get(`${API_URL}/bookings?userId=${userId}`);