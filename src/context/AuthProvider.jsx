// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To redirect on successful login/verification

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // On component mount, check if a token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check localStorage for token
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Attach token to all requests
      axios
        .get('https://cuvette-assignment-ashutosh-backend.onrender.com/api/auth/profile') // Fetch user data if token is valid
        .then((response) => {
          setUser(response.data.user); // Set the logged-in user data
          navigate('/home'); // Redirect to home if user is already logged in
        })
        .catch(() => {
          localStorage.removeItem('token'); // If token is invalid, clear it
        })
        .finally(() => {
          setLoading(false); // Stop loading after check
        });
    } else {
      setLoading(false); // If no token, stop loading immediately
    }
  }, [navigate]); // Add navigate as a dependency
  console.log(user);
  
  const signup = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post('https://cuvette-assignment-ashutosh-backend.onrender.com/api/auth/signup', credentials);
      // Assuming signup sends OTP to user's email, handle response as needed
      setError(null);
      navigate('/verify-otp'); // Redirect to OTP verification page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async ({ email, emailOtp }) => {
    setLoading(true);
    try {
      const response = await axios.post('https://cuvette-assignment-ashutosh-backend.onrender.com/api/auth/verify-otp', {
        email,
        emailOtp,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token after verification
      console.log("token stored successfully");
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token in headers

      setUser(user);
      setError(null);
      navigate('/home'); // Redirect to home after OTP verification
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post('https://cuvette-assignment-ashutosh-backend.onrender.com/api/auth/login', credentials);
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token for future requests

      setUser(user);
      setError(null);
      navigate('/home'); // Redirect to home after login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage
    delete axios.defaults.headers.common['Authorization']; // Remove token from axios headers
    navigate('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, verifyOtp, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
