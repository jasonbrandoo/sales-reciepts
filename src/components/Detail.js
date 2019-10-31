import React, { useContext, useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { ItemContext } from '../store/ItemContext';

const Detail = () => {
  const { state, dispatch } = useContext(ItemContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState([]);
  console.log(product);
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
      setProduct(state.cart);
    }
  }, [state.cart]);

  const addQty = cart => {
    const base = state.stock.find(i => i.title === cart.item.title);
    const multiply = cart.item.quantity + 1;
    const total = {
      ...cart,
      item: {
        ...cart.item,
        'total-price': parseFloat(multiply * base.price),
        quantity: multiply,
      },
    };
    dispatch({ type: 'ADD_QTY', payload: total });
    return multiply;
  };

  const subtractQty = cart => {
    if (cart.quantity === 1) {
      return 1;
    }
    const base = state.stock.find(i => i.title === cart.item.title);
    const minus = cart.item.quantity - 1;
    const total = {
      ...cart,
      item: {
        ...cart.item,
        'total-price': parseFloat(cart.item.price - base.price),
        quantity: minus,
      },
    };
    dispatch({ type: 'SUBTARCT_QTY', payload: total });
    return minus;
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
    setTotalPrice(0);
  };

  return (
    <div className="w-2/3 h-full p-8 bg-gray-100 relative">
      <table className="table-fixed w-full">
        <thead>
          <tr className="text-gray-900 text-xl">
            <th className="text-left">Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map(data => (
            <tr
              key={data.item.title}
              className="text-sm text-gray-900 font-hairline h-8"
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
                {data.item.quantity}
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
        {totalPrice > 0 ? (
          <tfoot>
            <tr className="text-sm text-gray-800 font-hairline h-8">
              <td />
              <td />
              <td />
              <td className="text-center border-black border-t">
                <span className="font-bold text-2xl">{totalPrice}</span>
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
      <div className="absolute bottom-0 right-0 mb-12 mr-12 flex">
        <Link
          to="/checkout"
          state={{ product, totalPrice }}
          className="p-2 bg-green-400 hover:bg-green-600 rounded font-bold text-gray-100 text-2xl"
        >
          Checkout
        </Link>
        <button
          className="p-2 ml-2 bg-red-400 hover:bg-red-600 rounded font-bold text-gray-100 text-2xl"
          type="button"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Detail;
