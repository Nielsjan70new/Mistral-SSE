
import React from 'react';
import { MicrosoftLogo } from './Icons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-white mb-4">
          Planon Knowledge Assistant
        </h1>
        <p className="text-gray-400 mb-8">
          Sign in to access your intelligent search assistant.
        </p>
        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center bg-white text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <MicrosoftLogo className="h-6 w-6 mr-3" />
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
