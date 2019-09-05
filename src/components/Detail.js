import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const Detail = () => {
  const { state, dispatch } = useContext(ItemContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const item = state.cart.length;
    if (item > 0) {
      const sum = state.cart.reduce((acc, curr) => acc + curr.price, 0);
      setTotalPrice(sum);
    }
  }, [state.cart]);

  const addQty = item => {
    const base = state.stock.find(value => value.id === item.id);
    const multiply = item.quantity + 1;
    const total = {
      ...item,
      quantity: multiply,
      price: multiply * base.price,
    };
    dispatch({ type: 'ADD_QTY', payload: total });
    return multiply;
  };

  const subtractQty = item => {
    if (item.quantity === 1) {
      return 1;
    }
    const base = state.stock.find(value => value.id === item.id);
    const minus = item.quantity - 1;
    const total = {
      ...item,
      quantity: minus,
      price: item.price - base.price,
    };
    dispatch({ type: 'SUBTARCT_QTY', payload: total });
    return minus;
  };
  console.log(state.cart, totalPrice);
  return (
    <div className="w-3/5 p-8 bg-gray-100 relative">
      <table className="table-fixed w-full">
        <thead>
          <tr className="text-gray-900 text-xl">
            <th className="pr-64">Name</th>
            <th className="pr-20">Quantity</th>
            <th className="pr-20">Price</th>
            <th className="pr-20">Total</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map(item => (
            <tr key={item.id} className="text-sm text-gray-800 font-hairline">
              <td>{item.title}</td>
              <td className="text-center pr-20">
                <button
                  className="mr-2 bg-red-500 hover:bg-red-700 text-white text-center rounded inline-block w-5"
                  type="button"
                  onClick={() => subtractQty(item)}
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white text-center rounded inline-block w-5"
                  type="button"
                  onClick={() => addQty(item)}
                >
                  +
                </button>
              </td>
              <td className="text-center pr-20">{item.price}</td>
              <td className="text-center pr-20">{item.price}</td>
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
