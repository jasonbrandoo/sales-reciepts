import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  state: PropTypes.object.isRequired,
};

const CheckoutDetail = ({ state }) => {
  return (
    <div className="w-full h-screen p-8 bg-gray-400 sm:h-full sm:w-2/3">
      <div className="text-2xl">Details</div>
      <div className="flex flex-col">
        <div className="flex text-xs font-bold text-left break-words sm:text-sm">
          <div className="w-8">No</div>
          <div className="w-1/5">Name</div>
          <div className="w-24">Type</div>
          <div className="w-1/4">Description</div>
          <div className="w-20 text-center">Price</div>
          <div className="w-20 mx-1 text-center">Quantity</div>
          <div className="w-20 text-center">Total Price</div>
        </div>
      </div>
      {state.cart.map((item, index) => (
        <div key={item.title} className="flex flex-col">
          <div className="flex text-xs text-left sm:text-sm">
            <div className="w-8 ">{index + 1}.</div>
            <div className="w-1/5">{item.title}</div>
            <div className="w-24">{item.type}</div>
            <div className="w-1/4">{item.description}</div>
            <div className="w-20 text-center">$ {item.price}</div>
            <div className="w-20 text-center mx-1">{item.quantity}</div>
            <div className="w-20 text-center">
              $ {item['total-price'] ? item['total-price'] : item.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

CheckoutDetail.propTypes = propTypes;

export default CheckoutDetail;
