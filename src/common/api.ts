import { db } from './firebase';

export const getAllFoods = () => {
  return db.collection('food').get();
};

export const getAllClothes = () => {
  return db.collection('clothes').get();
};

export const setAmount = (type: string, id: string, doc: any) => {
  return db.collection(type).doc(id).set(doc);
};
