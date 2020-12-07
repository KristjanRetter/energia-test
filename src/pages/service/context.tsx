import React, { createContext, useReducer } from 'react';

const initialState = {
  data: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      console.log('siin');
      return { ...state, data: action.value };
    default:
      return state;
  }
};

export const AppContext = createContext({} as any);

export const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    data: state.data,
    setData: (value: any) => dispatch({ type: 'SET_DATA', value }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
