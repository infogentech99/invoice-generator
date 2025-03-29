import React, { useState } from 'react';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openItem, setOpenItem] = useState(null);

  const navItems = [
    { title: 'Dashboard', path: '/admin-dashboard' },
    {
      title: 'Billing',
      children: [{ title: 'Back Office Billing', path: '/Billing/backoffice' }],
    },
    {
      title: 'Collection',
      children: [{ title: 'Manual Collection', path: '' }],
    },
    { title: 'Adjustment', path: '' },
    {
      title: 'View',
      children: [{ title: 'Customer History', path: '' }],
    },
    { title: 'Reports', path: '' },
    { title: 'Update', path: '' },
    { title: 'Help', path: '' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-[#0a0e11] text-white w-64 space-y-2 py-7 px-2 absolute inset-y-0 left-0 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 transition duration-200 ease-in-out z-50`}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Menu</h1>
        <nav className="mt-2">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setOpenItem(item.title)}
              onMouseLeave={() => setOpenItem(null)}
            >
              {item.children ? (
                <>
                  <div className="flex justify-between items-center w-full py-2.5 px-4 rounded hover:bg-gray-700 cursor-pointer">
                    <span>{item.title}</span>
                    {openItem === item.title ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  {openItem === item.title && (
                    <div className="ml-4 space-y-1 mt-1">
                      {item.children.map((subItem, subIdx) =>
                        subItem.path ? (
                          <Link
                            key={subIdx}
                            to={`/admin-dashboard/slide${subItem.path}`}
                            className="block py-2 px-3 rounded text-sm hover:bg-gray-700"
                          >
                            {subItem.title}
                          </Link>
                        ) : (
                          <span
                            key={subIdx}
                            className="block py-2 px-3 rounded text-sm text-gray-400"
                          >
                            {subItem.title}
                          </span>
                        )
                      )}
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
