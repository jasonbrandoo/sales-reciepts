import React, { useContext, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const Detail = () => {
  const { state, dispatch } = useContext(ItemContext);
  // const [quantity, setQuantity] = useState(1);

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
  console.log(state.cart);
  return (
    <div className="w-auto bg-gray-100 flex-grow-0">
      <table className="m-8">
        <thead>
          <tr className="text-black text-2xl">
            <th className="pr-64">Name</th>
            <th className="pr-20">Quantity</th>
            <th className="pr-20">Price</th>
            <th className="pr-20">Total</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map(item => (
            <tr key={item.id}>
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
      {/* <div className="flex m-4 text-white">
        <h1 className="mr-64 text-2xl">Name</h1>
        <h1 className="mr-20 text-2xl">Quantity</h1>
        <h1 className="mr-20 text-2xl">Price</h1>
        <h1 className="mr-20 text-2xl">Total</h1>
      </div>
      <hr />
      <div className="flex m-4 text-white">
        <h1 className="mr-64 text-2xl">Lorem</h1>
        <h1 className="mr-20 text-2xl">1</h1>
        <h1 className="mr-20 text-2xl">100</h1>
        <h1 className="mr-20 text-2xl">100</h1>
      </div> */}
    </div>
  );
};

export default Detail;
