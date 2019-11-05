import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../store/ItemContext';
import useIndexedDB from '../hooks/useIndexedDB';
import { groupBy, filterBy } from '../helpers';

const Item = () => {
  const { item } = useIndexedDB();
  const { dispatch } = useContext(ItemContext);
  const [product, setProduct] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    setProduct(item);
    const productType = groupBy(item, 'type');
    setType(Object.keys(productType));
  }, [item]);

  const handleAllType = () => {
    setProduct(item);
  };

  const handleType = selectedType => {
    const filterType = filterBy(item, selectedType);
    setProduct(filterType);
  };

  const handleClick = selectedItem => {
    const data = {
      item: {
        ...selectedItem,
        quantity: 1,
      },
    };
    dispatch({ type: 'GET_ITEM', payload: data });
  };

  return (
    <div className="w-1/3 bg-indigo-500 flex flex-col">
      <div className="flex flex-row flex-wrap justify-around overflow-y-auto p-5 h-full">
        {product.map(items => (
          <button
            key={items.title}
            type="button"
            className="pt-8 px-6 m-2 w-32 h-32 border border-white hover:bg-gray-100 hover:text-black rounded-lg text-gray-100 text-left text-xs font-bold"
            onClick={() => handleClick(items)}
          >
            {items.title}
            <span className="block">{items.price}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-row items-center bg-indigo-900 overflow-x-scroll overflow-y-hidden w-full">
        {type.length > 0 ? (
          <button
            className="flex-none hover:bg-gray-100 hover:text-black text-white w-32 h-20 font-semibold"
            type="button"
            onClick={handleAllType}
          >
            All
          </button>
        ) : null}
        {type.map(types => (
          <button
            className="flex-none hover:bg-gray-100 hover:text-black text-white w-32 h-20 font-semibold"
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
