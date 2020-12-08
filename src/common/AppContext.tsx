import React, { createContext, useEffect, useReducer } from 'react';
import * as API from './api';

const initialState = {
  foodData: [],
  clothesData: [],
  total: 0,
  selectedProducts: JSON.parse(localStorage.getItem('counts') || '[]'),
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_FOOD_DATA':
      return { ...state, foodData: action.value };
    case 'SET_CLOTHES_DATA':
      return { ...state, clothesData: action.value };
    case 'SET_SELECTED_PRODUCTS':
      localStorage.setItem('counts', JSON.stringify(action.value));
      return { ...state, selectedProducts: action.value };
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
    selectedProducts: state.selectedProducts,
    getAllProducts: () => getAllProducts(),
    setFoodData: (value: any) => dispatch({ type: 'SET_FOOD_DATA', value }),
    setClothesData: (value: any) => dispatch({ type: 'SET_CLOTHES_DATA', value }),
    setSelectedProducts: (value: any) => dispatch({ type: 'SET_SELECTED_PRODUCTS', value }),
    setTotal: (value: any) => dispatch({ type: 'SET_TOTAL', value }),
  };

  useEffect(() => {
    if (!localStorage.getItem('counts')) {
      localStorage.setItem('counts', '[]');
    }
  }, []);

  const addCount = (product: any) => {
    const hasCount = value.selectedProducts.find((item: any) => item.id === product.id);
    return hasCount ? { ...product, count: hasCount.count } : product;
  };

  const getAllProducts = () => {
    API.getAllFoods().then((allfoods: any) => {
      const foods = allfoods.docs.map((food: any) => addCount(food.data()));
      dispatch({ type: 'SET_FOOD_DATA', value: foods });
    });
    API.getAllClothes().then((allClothes: any) => {
      const clothes = allClothes.docs.map((clothing: any) => addCount(clothing.data()));
      dispatch({ type: 'SET_CLOTHES_DATA', value: clothes });
    });
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
