import React, { useReducer } from 'react';
import book from '../data/book';

const initialState = {
  stock: book,
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ITEM': {
      const index = state.cart.findIndex(i => i.id === action.payload.id);
      if (index === -1) {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
      return {
        ...state,
      };
    }
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
