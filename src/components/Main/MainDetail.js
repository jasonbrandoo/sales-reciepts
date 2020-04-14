import React, { useContext, useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { ItemContext } from '../../store/ItemContext';
import useReciept from '../../hooks/useReceipt';

const Detail = () => {
  const { item } = useReciept();
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
      setTotalPrice(Math.floor(sum));
      setProductDetail(cart);
    }
  }, [state]);

  const addQty = cart => {
    const base = item.find(i => i.title === cart.title);
    const multiply = cart.quantity + 1;
    const total = {
      ...cart,
      'total-price': Math.floor(multiply * base.price),
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
      'total-price': Math.floor(cart['total-price'] - base.price),
      quantity: minus,
    };
    dispatch({ type: 'SUBTARCT_QTY', payload: total });
  };

  const clearEntry = () => {
    dispatch({ type: 'CLEAR_ENTRY' });
  };

  const cancelAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
    setProductDetail([]);
    setTotalPrice(0);
  };

  return (
    <div className="w-1/2 h-screen bg-gray-200 md:h-full">
      <div className="p-8 ">
        <div className="flex justify-between font-hairline">
          <h3>Reciept</h3>
          <h3>{new Date().toLocaleDateString('id')}</h3>
        </div>
        <div className="flex w-full border border-black">
          <h3 className="w-12 text-center">No</h3>
          <h3 className="w-1/5 text-left sm:w-1/2">Name</h3>
          <h3 className="w-1/5 text-center">Quantity</h3>
          <h3 className="w-1/5 text-center">Price</h3>
          <h3 className="w-1/5 text-center">Total</h3>
        </div>
        <div
          className="flex flex-col w-full overflow-y-auto text-xs font-hairline border-l border-r border-black sm:text-base"
          style={{ height: '22rem' }}
        >
          {state.cart.map((data, index) => (
            <div className="flex flex-row my-1" key={data.title}>
              <div className="w-12 text-center">{index + 1}.</div>
              <div className="w-1/5 text-left sm:w-1/2">{data.title}</div>
              <div className="w-1/5 text-center">
                <button
                  className="inline-block w-2 mr-2 text-center text-white bg-red-500 rounded hover:bg-red-700 sm:w-5"
                  type="button"
                  onClick={() => subtractQty(data)}
                >
                  -
                </button>
                {data.quantity}
                <button
                  className="inline-block w-2 ml-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700 sm:w-5"
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
        <div className="flex flex-row text-center border border-black ">
          <div className="w-10" />
          <div className="w-1/5 sm:w-1/2" />
          <div className="w-1/5" />
          <div className="w-1/5 text-xs font-semibold sm:text-base">
            Sub Total
          </div>
          <div className="w-1/5 text-xs font-semibold sm:text-base">
            ${totalPrice}
          </div>
        </div>
        <div className="flex mt-2">
          {productDetail.length === 0 ? (
            <>
              <button
                type="button"
                className="p-1 text-xs text-green-500 border-2 border-green-500 rounded sm:text-base"
                disabled
              >
                Checkout
              </button>
              <button
                className="p-1 ml-2 text-xs text-yellow-500 border-2 border-yellow-500 rounded sm:text-base"
                type="button"
                disabled
              >
                Clear Entry
              </button>
              <button
                className="p-1 ml-2 text-xs text-red-500 border-2 border-red-500 rounded sm:text-base"
                type="button"
                disabled
              >
                Cancel All
              </button>
            </>
          ) : (
            <>
              <Link
                to="/checkout"
                state={{
                  cart: state.cart,
                  totalPrice,
                }}
                className="p-1 text-xs text-green-500 border-2 border-green-500 rounded outline-none hover:bg-green-500 hover:text-white sm:text-base"
              >
                Checkout
              </Link>
              <button
                className="p-1 ml-2 text-xs text-yellow-500 border-2 border-yellow-500 rounded hover:bg-yellow-500 hover:text-white sm:text-base"
                type="button"
                onClick={clearEntry}
              >
                Clear Entry
              </button>
              <button
                className="p-1 ml-2 text-xs text-red-500 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white sm:text-base"
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
