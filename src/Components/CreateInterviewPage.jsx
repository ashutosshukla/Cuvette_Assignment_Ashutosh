import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '@/components/ui/button';
import { FiHome } from 'react-icons/fi';
import axios from 'axios'; // Import axios for making API calls

const CreateInterviewPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [jobs, setJobs] = useState([]); // State to hold job postings
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch job postings from the backend API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs'); // Update with your endpoint
        setJobs(response.data); // Set job postings to state
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchJobs(); // Call fetch function
  }, []);

  // Function to handle button click
  const handleCreateInterview = () => {
    navigate('/job-posting'); // Navigate to the Job Posting Page
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center pt-6">
        <a href="/">
          <FiHome size={24} className="text-gray-500 hover:text-gray-700" />
        </a>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Create Interview Button */}
        <div className="flex justify-center mt-16">
          <Button 
            onClick={handleCreateInterview} // Add onClick handler
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
          >
            Create Interview
          </Button>
        </div>

        {/* Job Postings Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Job Postings</h2>
          {loading ? (
            <p>Loading jobs...</p> 
          ) : jobs.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {jobs.map((job) => (
                <li key={job._id} className="p-4 border rounded-md bg-white shadow">
                  <h3 className="text-md font-bold">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.description}</p>
                  <p className="text-sm text-gray-500">Experience Level: {job.experienceLevel}</p>
                  <p className="text-sm text-gray-500">Contact Email: {job.email}</p>
                  <p className="text-sm text-gray-500">End Date: {new Date(job.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No job postings available.</p> // Message when no jobs are found
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewPage;
