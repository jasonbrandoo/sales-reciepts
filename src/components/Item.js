import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const Item = () => {
  const { state, dispatch } = useContext(ItemContext);
  const [product, setProduct] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    setProduct(state.stock);
  }, [state.stock]);

  useEffect(() => {
    const groupBy = (object, property) => {
      return (
        object &&
        object.reduce((acc, obj) => {
          const key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {})
      );
    };
    const group = product && Object.keys(groupBy(product, 'type'));
    setType(group);
  }, [product]);

  const handleType = () => {};
  console.log(type);

  const handleClick = item => {
    const data = {
      quantity: 1,
      item,
    };
    dispatch({ type: 'GET_ITEM', payload: data });
  };

  return (
    <div className="w-2/5 h-full bg-indigo-600 flex flex-col">
      <div className="flex flex-row flex-wrap justify-between overflow-y-scroll p-5 h-full">
        {product &&
          product.map(items => (
            <button
              key={items.title}
              type="button"
              className="pt-12 px-6 m-2 w-32 h-32 border border-white hover:bg-gray-100 hover:text-black rounded-lg text-gray-100 text-left text-xs"
              onClick={() => handleClick(items)}
            >
              {items.title}
            </button>
          ))}
      </div>
      <div className="flex justify-around items-center bg-indigo-900 overflow-x-scroll">
        {type &&
          type.map(types => (
            <button
              className="hover:bg-gray-100 hover:text-black text-white pl-16"
              type="button"
              onClick={handleType}
              key={types}
            >
              {types}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Item;
