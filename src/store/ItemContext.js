import React, { useReducer } from 'react';

const initialState = {
  stock: [],
  daily: [],
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_ITEM':
      return {
        ...state,
        stock: [...state.stock, action.payload],
      };
    case 'GET_ITEM': {
      const index = state.cart.findIndex(
        i => i.item.title === action.payload.item.title,
      );
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
        cart: state.cart.map(i => {
          if (i.item.title === action.payload.item.title) {
            return { ...i, ...action.payload };
          }
          return {
            ...i,
          };
        }),
      };
    case 'CLEAR':
      return {
        ...state,
        cart: [],
      };
    case 'ADD_DAILY':
      return {
        ...state,
        daily: [...state.daily, action.payload],
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
