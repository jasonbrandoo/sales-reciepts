import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const Detail = () => {
  const { state, dispatch } = useContext(ItemContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const item = state.cart.length;
    if (item > 0) {
      const sum = state.cart.reduce((acc, curr) => {
        if (curr.item['total-price'] === undefined) {
          return acc + curr.item.price;
        }
        return acc + curr.item['total-price'];
      }, 0);
      setTotalPrice(parseFloat(sum));
    }
  }, [state.cart]);

  const addQty = cart => {
    const base = state.stock.find(i => i.title === cart.item.title);
    const multiply = cart.quantity + 1;
    const total = {
      ...cart,
      item: {
        ...cart.item,
        'total-price': parseFloat(multiply * base.price),
      },
      quantity: multiply,
    };
    dispatch({ type: 'ADD_QTY', payload: total });
    return multiply;
  };

  const subtractQty = cart => {
    if (cart.quantity === 1) {
      return 1;
    }
    const base = state.stock.find(i => i.title === cart.item.title);
    const minus = cart.quantity - 1;
    const total = {
      ...cart,
      item: {
        ...cart.item,
        'total-price': parseFloat(cart.item.price - base.price),
      },
      quantity: minus,
    };
    dispatch({ type: 'SUBTARCT_QTY', payload: total });
    return minus;
  };

  return (
    <div className="w-3/5 h-full p-8 bg-gray-100 relative">
      <table className="table-fixed w-full">
        <thead>
          <tr className="text-gray-900 text-xl">
            <th className="pr-64">Name</th>
            <th className="">Quantity</th>
            <th className="">Price</th>
            <th className="">Total</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map(data => (
            <tr
              key={data.item.title}
              className="text-sm text-gray-800 font-hairline"
            >
              <td>{data.item.title}</td>
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
              <td className="text-center">{data.item.price}</td>
              <td className="text-center">
                {data.item['total-price']
                  ? data.item['total-price']
                  : data.item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute bottom-0 right-0 mb-16 mr-24 flex flex-col items-center">
        <div className="p-4 bg-blue-400 rounded text-center">
          <div className="text-xl font-bold text-gray-100">Total Price</div>
          <div className="text-xl font-bold text-gray-100">{totalPrice}</div>
        </div>
        <button
          className="p-2 mt-4 bg-green-400 hover:bg-green-600 rounded font-bold text-gray-100"
          type="button"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Detail;
