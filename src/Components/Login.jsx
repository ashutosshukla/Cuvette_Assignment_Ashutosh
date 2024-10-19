import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider'; // Import the custom hook
import { useNavigate } from 'react-router-dom'; // To handle navigation

const Login = () => {
  const { login, verifyOtp, error, loading } = useAuth(); // Destructure the necessary values from AuthProvider
  const [email, setEmail] = useState(''); // Local state for email
  const [emailOtp, setEmailOtp] = useState(''); // Local state for OTP
  const [step, setStep] = useState(1); // State to manage the step of the login process
  const navigate = useNavigate(); // For navigation after login

  const handleEmailSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    await login({ email }); // Call the login function with email
    setStep(2); // Move to the OTP verification step
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    await verifyOtp({ email, emailOtp }); // Call the verifyOtp function with email and OTP
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={step === 1 ? handleEmailSubmit : handleOtpSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h1>Please Login Your account is already Present</h1>
        <h2 className="text-2xl font-bold mb-4">{step === 1 ? 'Login' : 'Verify OTP'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {step === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Requesting OTP...' : 'Request OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <label htmlFor="emailOtp" className="block text-sm font-medium mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                id="emailOtp"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                required
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
