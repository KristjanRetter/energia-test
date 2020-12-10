import { db } from './firebase';
import { QuerySnapshot, DocumentData, DocumentSnapshot } from '@firebase/firestore-types';
import { Product } from '../typings/Product';
import { OrderReceipt } from '../typings/OrderReceipt';

type CollectionType = 'food' | 'clothes' | 'receipt';

export const getAllFoods = (): Promise<QuerySnapshot<DocumentData>> => {
  return db.collection('food').get();
};

export const getAllClothes = (): Promise<QuerySnapshot<DocumentData>> => {
  return db.collection('clothes').get();
};

export const setDocument = (type: CollectionType, id: string, doc: Product | OrderReceipt): Promise<void> => {
  return db.collection(type).doc(id).set(doc);
};

export const getDocument = (type: CollectionType, id: string): Promise<DocumentSnapshot<DocumentData>> => {
  return db.collection(type).doc(id).get();
};
