import React, { createContext, useEffect, useReducer } from 'react';
import { Product } from '../typings/Product';
import { getAllFoods, getAllClothes } from './api';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore-types';

interface InitialState {
  foodData: [] | Product[];
  clothesData: [] | Product[];
  total: number;
  selectedProducts: [] | Product[];
}

const initialState: InitialState = {
  foodData: [],
  clothesData: [],
  total: JSON.parse(localStorage.getItem('total') || '0'),
  selectedProducts: JSON.parse(localStorage.getItem('counts') || '[]'),
};

interface Action {
  // eslint-disable-next-line
  value: any;
  type: 'SET_FOOD_DATA' | 'SET_CLOTHES_DATA' | 'SET_SELECTED_PRODUCTS' | 'SET_TOTAL';
}

interface AppContextProps {
  children: React.ReactNode;
}

const formatNumber = (num: number) => {
  const formatedNumString = num.toFixed(2);
  return Number(formatedNumString);
};

const reducer = (state: InitialState, action: Action) => {
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
      return { ...state, total: formatNumber(action.value) };
    default:
      return state;
  }
};

// eslint-disable-next-line
export const AppContext = createContext({} as any);

export const AppProvider = ({ children }: AppContextProps): React.FunctionComponentElement<AppContextProps> => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    foodData: state.foodData,
    clothesData: state.clothesData,
    total: state.total,
    selectedProducts: state.selectedProducts,
    getAllProducts: () => getAllProducts(),
    setFoodData: (value: Product[]) => dispatch({ type: 'SET_FOOD_DATA', value }),
    setClothesData: (value: Product[]) => dispatch({ type: 'SET_CLOTHES_DATA', value }),
    setSelectedProducts: (value: Product[]) => dispatch({ type: 'SET_SELECTED_PRODUCTS', value }),
    setTotal: (value: number) => dispatch({ type: 'SET_TOTAL', value }),
  };

  useEffect(() => {
    if (!localStorage.getItem('counts')) {
      localStorage.setItem('counts', '[]');
    }
  }, []);

  const addCount = (product: Product) => {
    const hasCount = value.selectedProducts.find((selectedProduct: Product) => selectedProduct.id === product.id);
    return hasCount ? { ...product, count: hasCount.count } : product;
  };

  const getAllProducts = () => {
    getAllFoods().then(allfoods => {
      const foods = allfoods.docs.map((food: QueryDocumentSnapshot<DocumentData>) => addCount(food.data() as Product));
      dispatch({ type: 'SET_FOOD_DATA', value: foods });
    });
    getAllClothes().then(allClothes => {
      const clothes = allClothes.docs.map((clothing: QueryDocumentSnapshot<DocumentData>) => addCount(clothing.data() as Product));
      dispatch({ type: 'SET_CLOTHES_DATA', value: clothes });
    });
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
