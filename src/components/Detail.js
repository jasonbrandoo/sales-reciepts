import React, { useContext, useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { ItemContext } from '../store/ItemContext';
import useReciept from '../hooks/useReceipt';

const Detail = () => {
  const { item, addDaily } = useReciept();
  const { state, dispatch } = useContext(ItemContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productDetail, setProductDetail] = useState([]);

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
    <div className="w-2/3 h-full bg-gray-200 flex flex-col">
      <div className="relative h-full p-8">
        <div className="flex justify-between font-semibold text-xl">
          <h3>Reciept</h3>
          <h3>{new Date().toLocaleDateString('id')}</h3>
        </div>
        <div className="flex w-full text-lg">
          <h3 className="w-10">No</h3>
          <h3 className="w-1/2">Name</h3>
          <h3 className="w-1/5">Quantity</h3>
          <h3 className="w-1/5">Price</h3>
          <h3 className="w-1/5">Total</h3>
        </div>
        <div className="flex flex-col w-full h-64 overflow-y-auto font-hairline">
          {state.cart.map((data, index) => (
            <div className="flex flex-row my-1">
              <div className="w-10">{index + 1}</div>
              <div className="w-1/2">{data.title}</div>
              <div className="w-1/5">
                <button
                  className="mr-2 bg-red-500 hover:bg-red-700 text-white text-center rounded inline-block w-5"
                  type="button"
                  onClick={() => subtractQty(data)}
                >
                  -
                </button>
                {data.quantity}
                <button
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white text-center rounded inline-block w-5"
                  type="button"
                  onClick={() => addQty(data)}
                >
                  +
                </button>
              </div>
              <div className="w-1/5">${data.price}</div>
              <div className="w-1/5">
                ${data['total-price'] ? data['total-price'] : data.price}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row border-t-2 border-black">
          <div className="w-10" />
          <div className="w-1/2" />
          <div className="w-1/5" />
          <div className="w-1/5 font-semibold text-lg my-2">Sub Total</div>
          <div className="w-1/5 font-semibold text-lg my-2">${totalPrice}</div>
        </div>
        <div className="flex">
          {productDetail.length === 0 ? (
            <>
              <button
                type="button"
                className="p-1 border-2 border-green-500 rounded text-green-500 text-2xl"
                disabled
              >
                Checkout
              </button>
              <button
                className="p-1 ml-2 border-2 border-yellow-500 rounded text-yellow-500 text-2xl"
                type="button"
                disabled
              >
                Clear Entry
              </button>
              <button
                className="p-1 ml-2 border-2 border-red-500 rounded text-red-500 text-2xl"
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
                className="p-1 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded text-green-500 text-2xl"
                onClick={checkout}
              >
                Checkout
              </button>
              <button
                className="p-1 ml-2 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white text-yellow-500 rounded text-2xl"
                type="button"
                onClick={clearEntry}
              >
                Clear Entry
              </button>
              <button
                className="p-1 ml-2 border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-500 rounded text-2xl"
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
          className="inline-block mt-2 p-1 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded text-blue-500 text-2xl"
        >
          Daily Sales
        </Link>
      </div>
    </div>
  );
};

export default Detail;
