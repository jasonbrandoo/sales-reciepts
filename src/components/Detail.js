import React, { useContext, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const Detail = () => {
  const { state, dispatch } = useContext(ItemContext);
  const [quantity, setQuantity] = useState(1);

  const addQty = price => {
    setQuantity(number => number + 1);
    const total = quantity * price;
    dispatch({ type: 'ADD_QTY', payload: total });
  };

  const substractQty = () => {
    setQuantity(number => {
      if (number === 1) {
        return 1;
      }
      return number - 1;
    });
  };
  console.log(state);
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
                  onClick={substractQty}
                >
                  -
                </button>
                {quantity}
                <button
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white text-center rounded inline-block w-5"
                  type="button"
                  onClick={() => addQty(item.price)}
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
