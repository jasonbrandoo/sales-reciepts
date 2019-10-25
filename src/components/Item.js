import React, { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';
import books from '../data/book';

const Item = () => {
  const { dispatch } = useContext(ItemContext);

  const handleClick = book => {
    const data = {
      quantity: 1,
      item: book,
    };
    dispatch({ type: 'GET_ITEM', payload: data });
  };

  return (
    <div className="w-2/5 h-full bg-indigo-600 flex flex-col">
      <div className="flex flex-row flex-wrap justify-between overflow-y-scroll p-5">
        {books.map(items => (
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
      <div className="flex justify-around items-center w-full p-6 bg-indigo-900">
        <button
          className="w-full h-full hover:bg-gray-100 hover:text-black text-white"
          type="button"
        >
          Books
        </button>
        <button
          className="w-full h-full hover:bg-gray-100 hover:text-black text-white"
          type="button"
        >
          Tools
        </button>
        <button
          className="w-full h-full hover:bg-gray-100 hover:text-black text-white"
          type="button"
        >
          Hardware
        </button>
      </div>
    </div>
  );
};

export default Item;
