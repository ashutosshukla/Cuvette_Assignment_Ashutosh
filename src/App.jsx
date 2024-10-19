import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Components/Signup';
import CreateInterviewPage from './Components/CreateInterviewPage';
import ProtectedRoute from './Routes/privateRoute';
import OTPVerificationPage from './Components/OtpVerification';
import { AuthProvider } from './context/AuthProvider';
import { Navigate } from 'react-router-dom';
import Login from './Components/Login';
import JobPostingPage from './Components/JobPosting';
import Navbar from './Components/Shared/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Navbar></Navbar>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job-posting" element={<JobPostingPage />} />

          <Route path="/otp-verification" element={<OTPVerificationPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CreateInterviewPage />
              </ProtectedRoute>
            }
          />
          {/* Add a catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;