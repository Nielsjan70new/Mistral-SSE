
import React from 'react';
import { PlanonLogo } from './Icons';
import type { SearchMode } from '../types';

interface HeaderProps {
  searchMode: SearchMode;
}

const Header: React.FC<HeaderProps> = ({ searchMode }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <PlanonLogo className="h-7 w-7 text-lime-500" />
            <span className="text-xl font-bold text-white tracking-tight">
              Planon Knowledge Assistant
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center font-bold text-white">
              NJ
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">Niels Janssen</p>
              <p className="text-xs text-gray-400">Project Lead</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;