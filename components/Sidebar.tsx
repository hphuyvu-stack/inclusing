
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Layout, Users, BarChart2, BookOpen, MessageCircle, FileText, HelpCircle, X } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 border-r border-gray-200 bg-white h-[calc(100vh-64px)] overflow-y-auto hidden md:block shrink-0`}>
      <div className="p-4 border-b flex items-center justify-between">
        <span className={`font-bold text-gray-500 text-xs uppercase ${!isOpen && 'hidden'}`}>Course Explorer</span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-100 rounded">
          {isOpen ? <X className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <nav className="p-2 space-y-1">
        {[
          { icon: BookOpen, label: 'General', items: ['Announcements', 'CI URTS6023'] },
          { icon: Layout, label: 'Meeting 1', items: ['Class Activity 1', 'Class Activity 2', 'Informatics Society'] },
          { icon: Layout, label: 'Meeting 2', items: ['Informatics in Education', 'Assignment 2 CASE STUDY'], active: true },
          { icon: Layout, label: 'Meeting 3', items: ['HCI'] },
        ].map((section, idx) => (
          <div key={idx} className="space-y-1">
            <button className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${section.active ? 'bg-[var(--utm-maroon)] text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
              <section.icon className="w-4 h-4 shrink-0" />
              <span className={`flex-1 text-left ${!isOpen && 'hidden'}`}>{section.label}</span>
              {isOpen && <ChevronDown className={`w-4 h-4 transition-transform ${section.active ? 'rotate-0' : '-rotate-90'}`} />}
            </button>
            {section.active && isOpen && (
              <div className="ml-7 space-y-1">
                {section.items.map((item, i) => (
                  <button key={i} className={`w-full text-left p-2 text-sm rounded-lg transition-colors ${item.includes('Education') ? 'text-[var(--utm-maroon)] font-bold bg-maroon-50 border-l-2 border-[var(--utm-maroon)]' : 'text-gray-500 hover:text-[var(--utm-maroon)] hover:bg-gray-50'}`}>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
