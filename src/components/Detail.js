import React, { useContext, useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { ItemContext } from '../store/ItemContext';
import useReciept from '../hooks/useReceipt';

const Detail = () => {
  const { item, addDaily } = useReciept();
  const { state, dispatch } = useContext(ItemContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const { cart } = state;
    if (cart.length > 0) {
      const sum = state.cart.reduce((acc, curr) => {
        if (curr['total-price'] === undefined) {
          return acc + curr.price;
        }
        return acc + curr['total-price'];
      }, 0);
      setTotalPrice(parseFloat(sum).toFixed(2));
      setProduct(state.cart);
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

  const checkout = () => {
    const { cart } = state;
    const date = new Date();
    const input = {
      cart: [...cart],
      date,
      total: totalPrice,
    };
    addDaily(input);
    dispatch({ type: 'ADD_DAILY', payload: input });
    dispatch({ type: 'CLEAR' });
    setProduct([]);
    setTotalPrice(0);
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
    setProduct([]);
    setTotalPrice(0);
  };

  return (
    <div className="w-2/3 h-full bg-indigo-200 flex flex-col">
      <div className="relative h-full p-8">
        <h1 className="text-center text-2xl">Reciept</h1>
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-gray-900 text-xl border-black border-b-2 border-t-2">
              <th className="text-left">Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {state.cart.map(data => (
              <tr
                key={data.title}
                className="text-sm text-gray-900 font-hairline h-8 border-black border-b"
              >
                <td>{data.title}</td>
                <td className="text-center">
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
                </td>
                <td className="text-center">{data.price}</td>
                <td className="text-center">
                  {data['total-price'] ? data['total-price'] : data.price}
                </td>
              </tr>
            ))}
          </tbody>
          {totalPrice > 0 ? (
            <tfoot>
              <tr className="text-sm text-gray-800 font-hairline h-8">
                <td />
                <td />
                <td />
                <td className="text-center">
                  <span className="font-bold text-2xl">{totalPrice}</span>
                </td>
              </tr>
            </tfoot>
          ) : null}
        </table>
        <div className="absolute bottom-0 left-0 text-2xl font-light pl-8 pb-8">
          {new Date().toLocaleDateString('id')}
        </div>
        <div className="absolute bottom-0 right-0 pr-8 pb-8 flex">
          {product.length === 0 ? (
            <button
              type="button"
              className="px-2 bg-green-600 rounded font-bold text-gray-100 text-2xl"
              disabled
            >
              Checkout
            </button>
          ) : (
            <button
              type="button"
              className="px-2 bg-green-400 hover:bg-green-600 rounded font-bold text-gray-100 text-2xl"
              onClick={checkout}
            >
              Checkout
            </button>
          )}
          {product.length === 0 ? (
            <button
              className="px-2 ml-2 bg-red-600 rounded font-bold text-gray-100 text-2xl"
              type="button"
              disabled
            >
              Cancel All
            </button>
          ) : (
            <button
              className="px-2 ml-2 bg-red-400 hover:bg-red-600 rounded font-bold text-gray-100 text-2xl"
              type="button"
              onClick={handleClear}
            >
              Cancel All
            </button>
          )}
        </div>
      </div>
      <div className="ml-auto h-16 pr-8">
        <Link
          to="/daily-sales"
          className="px-2 py-1 bg-blue-500 rounded text-white font-bold"
        >
          Daily Sales
        </Link>
      </div>
    </div>
  );
};

export default Detail;
