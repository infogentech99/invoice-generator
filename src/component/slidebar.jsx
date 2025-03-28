import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [hovered, setHovered] = useState(null);

  const navItems = [
    {
      title: 'dashboard',
      path: '/admin-dashboard',
    },
    {
      title: 'Billing',
      children: [
        { title: 'Back Office Billing', path: '/Billing/backoffice' },
      ]
    },
    {
      title: 'Collection',
      children: [
        { title: 'Manual Collection', path: '/collection/manual' },
      ]
    },
    {
      title: 'Adjustment',
      path: '/adjustment'
    },
    {
      title: 'View',
      children: [
        { title: 'Customer History', path: '/view/customer-history' }
      ]
    },
    {
      title: 'Reports',
      path: '/reports'
    },
    {
      title: 'Update',
      path: '/update'
    },
    {
      title: 'AI Anaysed Reports',
      path: '/ai-reports'
    },
    {
      title: 'Help',
      path: '/help'
    }
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`bg-gray-700 text-white w-64 space-y-2 py-7 px-2 absolute inset-y-0 left-0 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 transition duration-200 ease-in-out z-50`}>
        <h1 className="text-2xl font-bold text-center mb-4">Menu</h1>
        <nav className="mt-2">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => setHovered(item.title)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.children ? (
                <>
                  <div className="flex justify-between items-center py-2.5 px-4 rounded  cursor-pointer">
                    <span>{item.title}</span>
                    <ChevronRight size={16} />
                  </div>
                  {hovered === item.title && (
                    <div className="ml-4 space-y-1 bg-gray-700 m-1 rounded shadow-md">
                      {item.children.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          to={`/admin-dashboard/slide${subItem.path}`}
                          className="block py-3 px-3 rounded hover:bg-gray-600 text-sm"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="block py-2.5 px-4 rounded hover:bg-gray-700"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden absolute top-10 left-3 z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white" /> : <Menu className="text-gray-900" />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
