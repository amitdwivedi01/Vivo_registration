import React from 'react';
import logo from '../assets/new_logo.png';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-blue-600">
      {/* Logo at the top */}
      <div className="flex justify-center py-8 mt-[100px]">
        <img src={logo} className="w-[450px]" alt="" />
      </div>

      {/* Register button centered */}
      <div className="flex-grow flex justify-center items-center">
        <Link to="/register">
          <button
            className="bg-white hover:bg-gray-200 text-blue-600 font-bold py-3 shadow-lg px-[60px] text-3xl rounded-lg transition-colors duration-300"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Start;