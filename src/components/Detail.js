import React, { useContext, useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { ItemContext } from '../store/ItemContext';
import useReciept from '../hooks/useReceipt';
import Modal from './Modal';

const Detail = () => {
  const { item, addDaily } = useReciept();
  const { state, dispatch } = useContext(ItemContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productDetail, setProductDetail] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { cart } = state;
    if (cart.length > 0) {
      const sum = cart.reduce((acc, curr) => {
        if (curr['total-price'] === undefined) {
          return acc + curr.price;
        }
        return acc + curr['total-price'];
      }, 0);
      setTotalPrice(parseFloat(sum).toFixed(2));
      setProductDetail(cart);
    }
  }, [state]);

  const addQty = cart => {
    const base = item.find(i => i.title === cart.title);
    const multiply = cart.quantity + 1;
    const total = {
      ...cart,
      'total-price': parseFloat(multiply * base.price),
      quantity: multiply,
    };
    dispatch({ type: 'ADD_QTY', payload: total });
  };

  const subtractQty = cart => {
    if (cart.quantity === 1) {
      return;
    }
    const base = item.find(i => i.title === cart.title);
    const minus = cart.quantity - 1;
    const total = {
      ...cart,
      'total-price': parseFloat(cart['total-price'] - base.price),
      quantity: minus,
    };
    dispatch({ type: 'SUBTARCT_QTY', payload: total });
  };

  const clearEntry = () => {
    dispatch({ type: 'CLEAR_ENTRY' });
  };

  const checkout = () => {
    setOpen(prevState => {
      return !prevState;
    });
    const { cart } = state;
    const date = new Date();
    const input = {
      cart: [...cart],
      date,
      total: totalPrice,
    };
    addDaily(input);
    dispatch({ type: 'CLEAR_ALL' });
    setProductDetail([]);
    setTotalPrice(0);
  };

  const cancelAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
    setProductDetail([]);
    setTotalPrice(0);
  };

  return (
    <div className="md:w-2/3 sm:w-full h-full bg-blue-100 flex flex-col">
      <Modal open={open} setOpen={setOpen} />
      <div className="h-full p-8">
        <div className="flex justify-between font-hairline text-xl">
          <h3>Reciept</h3>
          <h3>{new Date().toLocaleDateString('id')}</h3>
        </div>
        <div className="flex w-full text-xs sm:text-lg font-semibold border border-black">
          <h3 className="w-12 text-center">No</h3>
          <h3 className="w-1/5 sm:w-1/2 text-left">Name</h3>
          <h3 className="w-1/5 text-center">Quantity</h3>
          <h3 className="w-1/5 text-center">Price</h3>
          <h3 className="w-1/5 text-center">Total</h3>
        </div>
        <div className="flex flex-col w-full h-64 text-xs sm:text-base border-r border-l border-black overflow-y-auto font-hairline">
          {state.cart.map((data, index) => (
            <div className="flex flex-row my-1" key={data.title}>
              <div className="w-12 text-center">{index + 1}.</div>
              <div className="w-1/5 sm:w-1/2 text-left">{data.title}</div>
              <div className="w-1/5 text-center">
                <button
                  className="mr-2 bg-red-500 hover:bg-red-700 text-white text-center rounded inline-block w-2 sm:w-5"
                  type="button"
                  onClick={() => subtractQty(data)}
                >
                  -
                </button>
                {data.quantity}
                <button
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white text-center rounded inline-block w-2 sm:w-5"
                  type="button"
                  onClick={() => addQty(data)}
                >
                  +
                </button>
              </div>
              <div className="w-1/5 text-center">${data.price}</div>
              <div className="w-1/5 text-center">
                ${data['total-price'] ? data['total-price'] : data.price}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row border border-black text-center">
          <div className="w-10" />
          <div className="w-1/5 sm:w-1/2" />
          <div className="w-1/5" />
          <div className="w-1/5 font-semibold text-xs sm:text-base">
            Sub Total
          </div>
          <div className="w-1/5 font-semibold text-xs sm:text-base">
            ${totalPrice}
          </div>
        </div>
        <div className="flex mt-2">
          {productDetail.length === 0 ? (
            <>
              <button
                type="button"
                className="p-1 border-2 border-green-500 rounded text-green-500 text-xs sm:text-base"
                disabled
              >
                Checkout
              </button>
              <button
                className="p-1 ml-2 border-2 border-yellow-500 rounded text-yellow-500 text-xs sm:text-base"
                type="button"
                disabled
              >
                Clear Entry
              </button>
              <button
                className="p-1 ml-2 border-2 border-red-500 rounded text-red-500 text-xs sm:text-base"
                type="button"
                disabled
              >
                Cancel All
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="p-1 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded text-green-500 text-xs sm:text-base"
                onClick={checkout}
              >
                Checkout
              </button>
              <button
                className="p-1 ml-2 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white text-yellow-500 rounded text-xs sm:text-base"
                type="button"
                onClick={clearEntry}
              >
                Clear Entry
              </button>
              <button
                className="p-1 ml-2 border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-500 rounded text-xs sm:text-base"
                type="button"
                onClick={cancelAll}
              >
                Cancel All
              </button>
            </>
          )}
        </div>
        <Link
          to="/daily-sales"
          className="inline-block mt-2 p-1 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded text-blue-500 text-xs sm:text-base"
        >
          Daily Sales
        </Link>
      </div>
    </div>
  );
};

export default Detail;
