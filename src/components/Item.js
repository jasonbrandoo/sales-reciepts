import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const Item = () => {
  const { state, dispatch } = useContext(ItemContext);
  const [product, setProduct] = useState(state.stock);
  const [type, setType] = useState([]);

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
    const productType = groupBy(state.stock, 'type');
    const group = Object.keys(productType);
    setType(group);
  }, [state.stock]);

  const handleAllType = () => {
    setProduct(state.stock);
  };

  const handleType = selectedType => {
    const filteredProduct = state.stock.filter(i => i.type === selectedType);
    setProduct(filteredProduct);
  };

  const handleClick = item => {
    const data = {
      quantity: 1,
      item,
    };
    dispatch({ type: 'GET_ITEM', payload: data });
  };

  return (
    <div className="w-2/5 h-full bg-indigo-600 flex flex-col">
      <div className="flex flex-row flex-wrap justify-between overflow-y-auto p-5 h-full">
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
      <div className="flex flex-row items-center bg-indigo-900 overflow-x-scroll overflow-y-hidden w-full">
        <button
          className="flex-none hover:bg-gray-100 hover:text-black text-white w-48 h-20 font-semibold"
          type="button"
          onClick={handleAllType}
        >
          All
        </button>
        {type &&
          type.map(types => (
            <button
              className="flex-none hover:bg-gray-100 hover:text-black text-white w-48 h-20 font-semibold"
              type="button"
              onClick={() => handleType(types)}
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
