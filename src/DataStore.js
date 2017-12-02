// @flow

import firebase from 'firebase/app'
import 'firebase/firestore'

import type { Food, Sleep, Symptom } from './types';

type Record = {
  +id?: string,
};

type Observer<T> = (records: Array<T>) => void;

class Store<T: Record> {
  _category: string;
  _entriesRef: any; // TODO Add better Firebase Flow types
  _observers: Array<Observer<T>> = [];
  _recordArray: Array<T> = [];
  _recordMap: {[id: string]: T} = {};

  constructor(entriesRef: any, category: string) {
    this._category = category;
    this._entriesRef = entriesRef;
    this._entriesRef
      .where("$category", "==", category)
      .orderBy("date", "desc")
      .limit(100)
      .onSnapshot(this._onSnapshot);
  }

  deleteRecord = (id: string): Promise<void> => {
    return this._entriesRef.doc(id).delete();
  };

  getRecord = (id: string): ?T => {
    return this._recordMap.hasOwnProperty(id)
      ? this._recordMap[id]
      : null;
  };

  registerObserver(observer: Observer<T>) {
    this._observers.push(observer);
  }

  saveRecord = (record: Record): Promise<void> => {
    const {id, ...rest} = record;

    const data = {
      ...rest,
      $category: this._category,
    };

    return id
      ? this._entriesRef.doc(id).set(data)
      : this._entriesRef.add(data);
  };

  _onSnapshot = (snapshot: any) => { // TODO Add better Firebase Flow types
    this._recordMap = {};
    this._recordArray = [];

    snapshot.forEach(data => {
      const id = data.id;
      const record = {
        ...data.data(),
        id,
      };

      this._recordArray.push(record);
      this._recordMap[id] = record;
    });

    this._observers.forEach(
      observer => observer(this._recordArray)
    );
  };
}

export default class DataStore {
  foods: Store<Food>;
  sleep: Store<Sleep>;
  symptoms: Store<Symptom>;

  constructor() {
    // TODO add Firebase auth

    firebase.initializeApp({
      apiKey: 'AIzaSyDm_dXL-x8vjJc2lzJpQxW6369Arv2sLp0',
      authDomain: 'food-tracker-c6279.firebaseapp.com',
      projectId: 'food-tracker-c6279'
    });

    const db = firebase.firestore();
    const entriesRef = db.collection("entries");

    this.foods = new Store(entriesRef, 'food');
    this.sleep = new Store(entriesRef, 'sleep');
    this.symptoms = new Store(entriesRef, 'symptom');
  }
}