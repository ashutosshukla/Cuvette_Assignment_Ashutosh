import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card.jsx';
import CardContent from './ui/CardContent';
import Input from './ui/Input'
import Button  from './ui/Button'
import { Mail } from 'lucide-react'; 
import { useAuth } from '../context/AuthProvider';

const OTPVerificationPage = () => {
  console.log('OTPVerificationPage rendered');
  const auth = useAuth();
  console.log('Auth context:', auth);
  
  const { verifyOtp, loading, error } = auth;
  const [emailOtp, setEmailOtp] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [localError, setLocalError] = useState('');
  
  const handleEmailChange = (e) => {
    console.log('Email changed:', e.target.value);
    setEmail(e.target.value);
    setLocalError('');
  };

  const handleEmailOtpChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    console.log('OTP changed:', value);
    setEmailOtp(value);
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { email, emailOtp });
    
    if (!email) {
      console.log('Validation failed: Email required');
      setLocalError('Email is required');
      return;
    }
    
    if (!emailOtp || emailOtp.length !== 6) {
      console.log('Validation failed: Invalid OTP length');
      setLocalError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      console.log('Attempting to verify OTP...');
      const result = await verifyOtp({ email, emailOtp });
      console.log('Verification result:', result);
    } catch (err) {
      console.error('Verification error:', err);
      setLocalError(err.message || 'Verification failed. Please try again.');
    }
  };

  console.log('Current state:', {
    email,
    emailOtp,
    loading,
    error,
    localError
  });

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 p-8">
        <img src="/logo.png" alt="Logo" className="h-8 mb-8" />
        <p className="text-gray-600 max-w-md">
          Please verify your account by entering the OTP sent to your email.
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-2">Verify OTP</h2>
            <p className="text-gray-500 text-center text-sm mb-6">
              Please enter the OTP sent to your email.
            </p>
            
            {(localError || error) && (
              <p className="text-red-500 text-sm text-center mb-4">
                {localError || error}
              </p>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-10"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={emailOtp}
                  onChange={handleEmailOtpChange}
                  className="pl-10"
                  required
                  disabled={loading}
                  maxLength={6}
                  pattern="\d{6}"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
                variant="default"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerificationPage;