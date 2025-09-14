import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiBarChart2, FiSettings, FiFileText } from 'react-icons/fi';

const Sidebar = () => {
  const navLinks = [
    { name: 'Contracts', path: '/', icon: FiFileText },
    { name: 'Insights', path: '/insights', icon: FiGrid },
    { name: 'Reports', path: '/reports', icon: FiBarChart2 },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
        SaaS Contracts
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center p-3 my-1 rounded-md transition-colors ${
                    isActive ? 'bg-indigo-600' : 'hover:bg-gray-700'
                  }`
                }
              >
                <link.icon className="mr-3" />
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;