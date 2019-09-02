import React, { useReducer } from 'react';

const initialState = {
  name: null,
  quantity: null,
  price: null,
  total: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        name: action.payload.name,
        quantity: action.payload.quantity,
        price: action.payload.price,
        total: action.payload.total,
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
