import React, { createContext, useReducer } from 'react';

const initialState = {
  foodData: [],
  clothesData: [],
  total: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_FOOD_DATA':
      return { ...state, foodData: action.value };
    case 'SET_CLOTHES_DATA':
      return { ...state, clothesData: action.value };
    case 'SET_TOTAL':
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
    foodData: state.foodData,
    clothesData: state.clothesData,
    total: state.total,
    setFoodData: (value: any) => dispatch({ type: 'SET_FOOD_DATA', value }),
    setClothesData: (value: any) => dispatch({ type: 'SET_CLOTHES_DATA', value }),
    setTotal: (value: any) => dispatch({ type: 'SET_TOTAL', value }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};