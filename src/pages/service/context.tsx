import React, { createContext, useReducer } from 'react';

const initialState = {
  data: [],
  total: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.value };
    case 'SET_TOTAL':
      console.log(action.value);
      localStorage.setItem('total', JSON.stringify(action.value));
      return { ...state, total: action.value };
    default:
      return state;
  }
};

export const AppContext = createContext({} as any);

export const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    data: state.data,
    total: state.total,
    setData: (value: any) => dispatch({ type: 'SET_DATA', value }),
    setTotal: (value: any) => dispatch({ type: 'SET_TOTAL', value }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
