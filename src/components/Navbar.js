import React, { useState } from 'react';
import { Link } from '@reach/router';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(state => !state);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-2 bg-blue-900">
      <div className="text-white">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          Reciept App
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white"
          type="button"
          onClick={toggle}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={
          open
            ? 'w-full flex-grow lg:flex lg:items-center lg:w-auto block'
            : 'w-full flex-grow lg:flex lg:items-center lg:w-auto hidden'
        }
      >
        <div className="text-sm lg:ml-auto">
          <a
            href="https://github.com/jasonbrandoo/receipt"
            className="text-sm text-white mt-4 lg:mt-0 lg:p-4"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
