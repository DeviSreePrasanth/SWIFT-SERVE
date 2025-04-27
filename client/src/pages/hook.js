// src/pages/hook.js (or src/hooks/hook.js)
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuthStatus = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
        const response = await axios.get('/api/auth/user');
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error checking auth status:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError(err.response?.data?.message || 'Failed to check status');
        setLoading(false);
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    };
    checkStatus();
  }, []);

  return { user, error, loading };
};