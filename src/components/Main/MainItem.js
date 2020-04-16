import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../store/ItemContext';
import useReciept from '../../hooks/useReceipt';
import { groupBy, filterBy } from '../../utils';

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
    <div className="flex flex-col bg-gray-800 sm:w-full md:w-1/2">
      <div
        className="p-2 mx-1 my-2 overflow-y-auto grid-container"
        style={{ height: 'calc(100vh - 44px)' }}
      >
        {product.length === 0 ? (
          <div>Loading</div>
        ) : (
          product.map(items => (
            <button
              key={items.title}
              type="button"
              className="px-6 py-4 text-xs text-left text-gray-100 border-2 border-white rounded-lg hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              onClick={() => handleProduct(items)}
            >
              {items.title}
              <span className="block">${items.price}</span>
            </button>
          ))
        )}
      </div>
      <div className="flex flex-row w-full overflow-x-scroll overflow-y-hidden bg-gray-900">
        <button
          className="flex-none w-32 py-1 text-gray-500 hover:bg-white hover:text-black focus:bg-white focus:text-black"
          type="button"
          onClick={handleAllType}
        >
          ALL
        </button>
        {type.map(types => (
          <button
            className="flex-none w-32 py-1 text-gray-500 hover:bg-white hover:text-black focus:bg-white focus:text-black uppercase"
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
