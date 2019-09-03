import React, { useReducer } from 'react';

const initialState = {
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
      console.log(action);
      return {
        ...state,
        cart: [...state.cart],
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
