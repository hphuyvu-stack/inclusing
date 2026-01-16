
import React from 'react';
import { Bell, MessageSquare, ChevronDown, Accessibility } from 'lucide-react';

interface Props {
  onTogglePanel: () => void;
}

const Header: React.FC<Props> = ({ onTogglePanel }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 px-4 md:px-6 h-16 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--utm-maroon)] rounded flex items-center justify-center overflow-hidden">
            <span className="text-white font-bold text-xs">UTM</span>
          </div>
          <h1 className="text-xl font-bold text-[var(--utm-maroon)] hidden md:block">Universiti Teknologi Malaysia</h1>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-[var(--utm-maroon)]">Home</a>
          <a href="#" className="hover:text-[var(--utm-maroon)]">Dashboard</a>
          <a href="#" className="text-[var(--utm-maroon)] border-b-2 border-[var(--utm-maroon)] pb-5 translate-y-2.5">My courses</a>
          <a href="#" className="hover:text-[var(--utm-maroon)]">Reports & Analytics</a>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Accessibility Button - The Core Innovation */}
        <button 
          onClick={onTogglePanel}
          className="p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full transition-all flex items-center gap-2 px-3 group"
          aria-label="Open accessibility control panel"
          title="Accessibility (Alt + A)"
        >
          <Accessibility className="w-6 h-6" />
          <span className="hidden sm:inline font-bold">Accessibility</span>
        </button>

        <div className="flex items-center border-l pl-4 gap-1 md:gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--utm-maroon)] text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white">3</span>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <MessageSquare className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 pr-2 rounded-full transition-colors ml-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs border border-gray-300">
              HM
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
