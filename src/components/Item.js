import React, { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';
import books from '../data/book';

const Item = () => {
  const { dispatch } = useContext(ItemContext);

  const handleClick = book => {
    dispatch({ type: 'GET_ITEM', payload: book });
  };

  return (
    <div className="w-2/5 bg-gray-400 flex-grow-0">
      <div className="flex flex-wrap m-4">
        {books.map(items => (
          <button
            key={items.id}
            type="button"
            className="pt-12 px-6 m-3 w-32 h-32 bg-blue-100 rounded-lg text-gray-800"
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
