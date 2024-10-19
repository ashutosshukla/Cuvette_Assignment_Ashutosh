import React from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "../ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth(); // Get the user and logout function
    const handleLogOut=(e)=>{
        logout();
    }


  return (
    <header className="flex items-center justify-between mb-6 p-2">
      <img
        src="https://cuvette.tech/app/static/media/logo.74bda650.svg"
        alt="Covette"
        className="h-8"
      />
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
          Contact
        </Button>
        <Button onClick={handleLogOut} variant="ghost" className="text-gray-500 hover:text-red-700">
          Logout
        </Button>

      </div>
    </header>
  );
};

export default Navbar;
