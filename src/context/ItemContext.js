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
    case 'ADD_QTY':
    case 'SUBTARCT_QTY':
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload };
          }
          return {
            ...item,
          };
        }),
      };
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
