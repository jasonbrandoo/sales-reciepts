import React from 'react';
import PropTypes from 'prop-types';
import { sum } from '../../utils';

const propTypes = {
  state: PropTypes.object.isRequired,
};

const CheckoutDetail = ({ state }) => {
  const totalQty = sum(state.cart.map(item => item.quantity));
  return (
    <div className="w-full h-full overflow-y-auto bg-gray-200 sm:w-2/3">
      <div className="p-4 text-2xl">Detail</div>
      <div className="flex flex-col px-4">
        <div className="flex py-2 text-xs border border-black sm:text-sm">
          <div className="w-12 text-center">No</div>
          <div className="w-1/5">Name</div>
          <div className="w-1/5">Type</div>
          <div className="w-1/5">Description</div>
          <div className="w-1/5 text-center">Price</div>
          <div className="w-1/5 text-center">Quantity</div>
          <div className="w-1/5 text-center">Total Price</div>
        </div>
      </div>
      {state.cart.map((item, index) => (
        <div key={item.title} className="flex flex-col px-4">
          <div className="flex text-xs border-b border-l border-r border-black sm:text-sm">
            <div className="w-12 text-center">{index + 1}.</div>
            <div className="w-1/5">{item.title}</div>
            <div className="w-1/5">{item.type}</div>
            <div className="w-1/5">{item.description}</div>
            <div className="w-1/5 text-center">$ {item.price}</div>
            <div className="w-1/5 text-center">{item.quantity}</div>
            <div className="w-1/5 text-center">
              $ {item['total-price'] ? item['total-price'] : item.price}
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col px-4 pb-4">
        <div className="flex py-2 border-b border-l border-r border-black">
          <div className="w-12 text-center" />
          <div className="w-1/5" />
          <div className="w-1/5" />
          <div className="w-1/5" />
          <div className="w-1/5 text-center" />
          <div className="w-1/5 font-semibold text-center">{totalQty}</div>
          <div className="w-1/5 text-center font-semibold">
            $ {state.totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutDetail.propTypes = propTypes;

export default CheckoutDetail;
