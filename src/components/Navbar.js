import React, { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(state => !state);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-900 p-6">
      <div className="text-white">
        <span className="font-semibold text-xl tracking-tight">Cashier</span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          type="button"
          onClick={toggle}
        >
          <svg
            className="fill-current h-3 w-3"
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
            href="#logout"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
