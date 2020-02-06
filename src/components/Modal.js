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
        <div className="w-64 p-5 bg-white rounded modal-content">
          <div className="text-xl">Confirm</div>
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
    );
  }
  return <div className="hidden" />;
};

Modal.propTypes = propTypes;

export default Modal;
