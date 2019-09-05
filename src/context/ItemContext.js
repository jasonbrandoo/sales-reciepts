import React, { useReducer } from 'react';
import book from '../data/book';

const initialState = {
  stock: book,
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ITEM':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'ADD_QTY': {
      const item = state.cart.find(books => books.id === action.payload.id);
      console.log(...state.cart);
      return {
        ...state,
        cart: [...state.cart, { ...item, ...action.payload }],
      };
    }
    default:
      throw new Error();
  }
};

const ItemContext = React.createContext();

const ItemProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

export { ItemContext, ItemProvider };
