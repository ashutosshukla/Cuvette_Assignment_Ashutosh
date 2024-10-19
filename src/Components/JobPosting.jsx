import React, { useState } from 'react'; 
import axios from 'axios';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/button';
import { FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const JobPostingPage = () => {
  const navigate =useNavigate();
  // State to manage form inputs
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('https://cuvette-assignment-ashutosh-backend.onrender.com/api/auth/jobs', {
        title: jobTitle,
        description: jobDescription,
        experienceLevel,
        email,
        date,
      });

      // Handle the successful response (e.g., show a success message)
      if (response.message === 'Job posted successfully') {
        navigate('/home');

      }
      console.log(response.data);
      // Reset form inputs if necessary
      setJobTitle('');
      setJobDescription('');
      setExperienceLevel('');
      setEmail('');
      setDate('');
      setError(null); // Clear any previous errors
    } catch (err) {
      // Handle any errors that occur during the API call
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div>
            {/* Sidebar */}
            <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center pt-6">
        <a href="/">
          <FiHome size={24} className="text-gray-500 hover:text-gray-700" />
        </a>
      </aside>
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Post a Job</h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter Job Title"
          className="w-full"
          required
        />
        
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter Job Description"
          className="w-full h-32 p-3 border rounded-md resize-none"
          required
        />
        
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="w-full p-2 border rounded-md bg-white"
          required
        >
          <option value="" disabled>Select Experience Level</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>
        
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="xyz@gmail.com"
          className="w-full"
          required
        />
        
        <Input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="w-full"
          required
        />
        
        {error && <div className="text-red-500">{error}</div>}

        <Button type="submit" className="w-24 bg-blue-600 hover:bg-blue-700 text-white">
          Send
        </Button>
      </form>
    </div>
    </div>
  );
};

export default JobPostingPage;
