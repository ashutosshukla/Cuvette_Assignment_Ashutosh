import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [employeeSize, setEmployeeSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Sign-up logic with OTP sending
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission
    setErrorMessage(''); // Clear previous error message

    // Basic validation
    if (!name || !phone || !companyName || !email || !employeeSize) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      setIsLoading(true); // Start loading state
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        phone,
        companyName,
        email,
        employeeSize,
      });

      if (response.data.message === 'User registered, OTP sent to email') {
        // Navigate to the OTP verification page after successful signup
        navigate('/otp-verification', { state: { email } });
        // Clear form inputs after successful signup
        setName('');
        setPhone('');
        setCompanyName('');
        setEmail('');
        setEmployeeSize('');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Redirect to login page if status code is 400
            navigate('/login');
          } 
      setErrorMessage(error.response?.data?.message || 'An error occurred during sign-up.');
      console.error('Error during sign-up', error);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex items-center justify-between min-h-screen bg-gray-100 p-8">
      {/* Left side description */}
      <div className="max-w-lg">
        <img src="https://cuvette.tech/app/static/media/logo.74bda650.svg" alt="Company Logo" className="h-12 mb-8" />
        <p className="text-gray-600 text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>} {/* Error Message */}
        <form onSubmit={handleSignUp}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Phone no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Employee Size"
              value={employeeSize}
              onChange={(e) => setEmployeeSize(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit" // Ensure this is a submit button
            className={`w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Proceed'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
