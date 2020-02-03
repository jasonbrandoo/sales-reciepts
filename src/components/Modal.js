import React from 'react';

const Modal = ({ open, setOpen }) => {
  const handleOpen = () => {
    setOpen(prevState => !prevState);
  };
  if (open) {
    return (
      <div className="modal">
        <div className="w-64 p-5 bg-white rounded modal-content">
          <div className="text-xl">Confirm</div>
          <div className="flex justify-between">
            <div>Total</div>
            <div>2131232</div>
          </div>
          <div className="flex justify-between">
            <div>Paid</div>
            <div>3132</div>
          </div>
          <div className="flex justify-between">
            <div>Kembalian</div>
            <div>213123</div>
          </div>
          <div className="flex justify-around mt-5">
            <button
              type="button"
              className="p-3 bg-red-400 rounded close"
              onClick={handleOpen}
            >
              Cancel
            </button>
            <button
              type="button3"
              className="p-3 bg-green-400 rounded close"
              onClick={handleOpen}
            >
              Proccess
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <div className="hidden" />;
};

export default Modal;
