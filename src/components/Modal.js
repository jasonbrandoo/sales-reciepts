import React from 'react';

const Modal = ({ open, setOpen }) => {
  const handleOpen = () => {
    setOpen(prevState => !prevState);
  };
  if (open) {
    return (
      <div className="modal">
        <div className="modal-content bg-green-400 p-5 text-white text-xl font-semibold rounded">
          Success
          <button type="button" className="close ml-5" onClick={handleOpen}>
            &times;
          </button>
        </div>
      </div>
    );
  }
  return <div className="hidden fixed z-10 left-0 top-0 w-full h-full" />;
};

export default Modal;
