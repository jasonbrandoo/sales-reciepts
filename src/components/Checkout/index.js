import React from 'react';
import PropTypes from 'prop-types';
import CheckoutBill from './CheckoutBill';
import CheckoutDetail from './CheckoutDetail';

const defaultProps = {
  location: {},
  navigate: () => {},
};

const propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.func,
};

const Checkout = ({ location, navigate }) => {
  const { state } = location;
  return (
    <div
      className="h-full bg-gray-100 sm:flex sm:flex-row min-h-full"
      style={{ height: 'calc(100vh - 44px)' }}
    >
      <CheckoutBill state={state} navigate={navigate} />
      <CheckoutDetail state={state} />
    </div>
  );
};

Checkout.defaultProps = defaultProps;
Checkout.propTypes = propTypes;

export default Checkout;
