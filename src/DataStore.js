// @flow

import firebase from 'firebase/app'
import 'firebase/firestore'

import type { Food, Sleep, Symptom } from './types';

/*
TODO: Maybe split into multiple stores?

Stores: {
  food,
  sleep,
  symptoms,
}

Store: {
  deleteRecord(id)      Remove from map and array.
  getRecord(id)         Read from map.
  loadRecords()         Should store for easy iteration and quick lookup.
  registerObserver(fn)  Call after each load/delete/save.
  saveRecord(data)      Should insert (or remove and re-insert) in the list based on date + time.
}
*/

type Updater = (partialState: Object) => void;

export default class DataStore {
  // TODO Add better Firebase Flow types
  _entries: any;
  _db: any;

  constructor(updater: Updater) {
    // TODO add Firebase auth

    firebase.initializeApp({
      apiKey: 'AIzaSyDm_dXL-x8vjJc2lzJpQxW6369Arv2sLp0',
      authDomain: 'food-tracker-c6279.firebaseapp.com',
      projectId: 'food-tracker-c6279'
    });

    this._db = firebase.firestore();
    this._entries = this._db.collection("entries");
    this._entries
      .where("$category", "==", "food")
      .orderBy("date", "desc")
      .limit(100)
      .onSnapshot(createHandler(foods => updater({foods})));
    this._entries
      .where("$category", "==", "sleep")
      .orderBy("date", "desc")
      .limit(100)
      .onSnapshot(createHandler(sleep => updater({sleep})));
    this._entries
      .where("$category", "==", "symptom")
      .orderBy("date", "desc")
      .limit(100)
      .onSnapshot(createHandler(symptoms => updater({symptoms})));
  }

  _saveEntry = (category: string, {id, ...rest}: Object) => {
    const data = {
      ...rest,
      $category: category,
    };

    return id
      ? this._entries.doc(id).set(data)
      : this._entries.add(data);
  };

  delete = (id: string) => this._entries.doc(id).delete();

  saveFood = (food: Food) => this._saveEntry('food', food);
  saveSleep = (sleep: Sleep) => this._saveEntry('sleep', sleep);
  saveSymptom = (symptom: Symptom) => this._saveEntry('symptom', symptom);
}

const createHandler = reducer => snapshot => {
  const entries = [];

  snapshot.forEach(data => {
    entries.push({
      ...data.data(),
      id: data.id
    });
  });

  reducer(entries);
};