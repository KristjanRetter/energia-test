import { Product } from '../typings/Product';
import { db, fire } from './firebase';
import firebase from 'firebase';

export const getAllFoods = () => {
  return db.collection('food').get();
};

export const getAllClothes = (): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => {
  return db.collection('clothes').get();
};

//shange name
export const setAmount = (type: string, id: string, doc: any) => {
  return db.collection(type).doc(id).set(doc);
};

export const getDocument = (type: string, id: string) => {
  return db.collection(type).doc(id).get();
};
