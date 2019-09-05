import React, { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';
import books from '../data/book';

const Item = () => {
  const { dispatch } = useContext(ItemContext);

  const handleClick = book => {
    dispatch({ type: 'GET_ITEM', payload: book });
  };

  return (
    <div className="w-2/5 bg-purple-900">
      <div className="flex flex-row flex-wrap justify-between m-8">
        {books.map(items => (
          <button
            key={items.id}
            type="button"
            className="pt-12 px-6 m-2 w-32 h-32 border border-white hover:bg-gray-100 hover:text-black rounded-lg text-gray-100 text-left text-xs"
            onClick={() => handleClick(items)}
          >
            {items.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Item;
