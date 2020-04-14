import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  bill: PropTypes.number.isRequired,
  paid: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

const Modal = ({ open, setOpen, bill, paid, change, handleConfirm }) => {
  const handleOpen = () => {
    setOpen(prevState => !prevState);
  };
  if (open) {
    return (
      <div className="modal">
        <div className="w-64 border-2 rounded modal-content">
          <div className="p-4 bg-blue-500">
            <div className="text-xl text-white">Confirm</div>
          </div>
          <div className="p-4 bg-white">
            <div className="flex justify-between">
              <div>Bill</div>
              <div>$ {bill}</div>
            </div>
            <div className="flex justify-between">
              <div>Paid</div>
              <div>$ {paid}</div>
            </div>
            <div className="flex justify-between">
              <div>Change</div>
              <div>$ {change}</div>
            </div>
            <div className="flex justify-around mt-5">
              <button
                type="button"
                className="p-3 text-white bg-red-400 rounded hover:bg-red-600"
                onClick={handleOpen}
              >
                Cancel
              </button>
              <button
                type="button"
                className="p-3 bg-green-400 rounded hover:bg-green-600 text-white"
                onClick={handleConfirm}
              >
                Proccess
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div className="hidden" />;
};

Modal.propTypes = propTypes;

export default Modal;
