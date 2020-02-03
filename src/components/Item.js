import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../store/ItemContext';
import useReciept from '../hooks/useReceipt';
import { groupBy, filterBy } from '../utils';

const Item = () => {
  const { item } = useReciept();
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

  const handleProduct = selectedItem => {
    const data = {
      ...selectedItem,
      quantity: 1,
    };
    dispatch({ type: 'GET_ITEM', payload: data });
  };

  return (
    <div className="flex flex-col h-full bg-blue-700 md:w-1/3 sm:w-full">
      <div className="flex flex-row flex-wrap justify-around flex-auto h-0 p-5 overflow-y-auto">
        {product.map(items => (
          <button
            key={items.title}
            type="button"
            className="w-32 h-32 px-6 pt-8 m-2 text-xs font-semibold text-left text-gray-100 border-2 border-white rounded-lg hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
            onClick={() => handleProduct(items)}
          >
            {items.title}
            <span className="block">${items.price}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-row items-center w-full h-12 overflow-x-scroll overflow-y-hidden text-xs bg-blue-900 sm:text-base">
        <button
          className="flex-none w-32 h-full font-semibold text-white hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
          type="button"
          onClick={handleAllType}
        >
          ALL
        </button>
        {type.map(types => (
          <button
            className="flex-none hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black text-white w-32 h-full font-semibold uppercase"
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
