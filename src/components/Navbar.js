import React, { useState } from 'react';
import { Link } from '@reach/router';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(state => !state);
  };

  return (
    <header className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-1">
      <div className="flex items-center justify-between px-4 py-1 sm:p-0">
        <Link className="text-2xl text-gray-500 hover:text-white" to="/">
          RecieptApp
        </Link>
        <div className="sm:hidden">
          <button
            type="button"
            onClick={toggle}
            className="block text-gray-500 hover:text-white focus:text-white"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={
          open ? 'block px-2 pt-1 pb-4 sm:flex sm:p-0' : 'hidden sm:flex sm:p-0'
        }
      >
        <Link
          to="/"
          className="block px-2 py-1 font-semibold text-white rounded hover:bg-gray-800"
        >
          Settings
        </Link>
        <Link
          to="/"
          className="block px-2 py-1 my-1 font-semibold text-white rounded hover:bg-gray-800 sm:m-0"
        >
          Sign Out
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
