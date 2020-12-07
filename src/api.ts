import { db } from './common/firebase';

export const getAllFoods = () => {
  return db.collection('food').get();
};

export const getClothesData = () => {
  return db.collection('services').doc('clothes').get();
};

export const setAmount = (id: string, doc: any) => {
  return db.collection('food').doc(id).set(doc);
};
