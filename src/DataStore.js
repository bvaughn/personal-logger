// @flow

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import type { Exercise, Food, Sleep, Symptom, User } from './types';

type Record = {
  +id?: string,
};

// TODO Add better Firebase Flow types for refs and snapshots

type Observer<T> = (records: Array<T>) => void;

class Store<T: Record> {
  _category: string;
  _entriesRef: any;
  _observers: Array<Observer<T>> = [];
  _recordArray: Array<T> = [];
  _recordMap: { [id: string]: T } = {};
  _uid: string;

  constructor(entriesRef: any, category: string, uid: string) {
    this._category = category;
    this._uid = uid;

    // Flow incorrect handles class properties.
    // Without this workaround it can't find <T> for getRecord.
    // See https://tinyurl.com/ya9zfusp
    this.getRecord = this._getRecord.bind(this);

    this._entriesRef = entriesRef;
    this._entriesRef
      .where('$category', '==', category)
      .where('user', '==', uid)
      .orderBy('date', 'desc')
      .limit(100)
      .onSnapshot(this._onSnapshot);
  }

  deleteRecord = (id: string): Promise<void> => {
    return this._entriesRef.doc(id).delete();
  };

  // Flow incorrect handles class properties.
  // Without this workaround it can't find <T> for getRecord.
  // See https://tinyurl.com/ya9zfusp
  getRecord: (id: string) => Promise<T>;
  _getRecord(id: string): Promise<T> {
    if (this._recordMap !== null && this._recordMap.hasOwnProperty(id)) {
      return Promise.resolve(this._recordMap[id]);
    } else {
      return Promise.resolve(
        this._entriesRef
          .doc(id)
          .get()
          .then(doc => doc.data())
      );
    }
  }

  registerObserver(observer: Observer<T>) {
    this._observers.push(observer);
  }

  saveRecord = (record: Record): Promise<void> => {
    const { id, ...rest } = record;

    const data = {
      ...rest,
      $category: this._category,
      user: this._uid,
    };

    return id ? this._entriesRef.doc(id).set(data) : this._entriesRef.add(data);
  };

  _onSnapshot = (snapshot: any) => {
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

    this._observers.forEach(observer => observer(this._recordArray));
  };
}

export default class DataStore {
  exercise: Store<Exercise>;
  foods: Store<Food>;
  sleep: Store<Sleep>;
  symptoms: Store<Symptom>;
  user: ?User = null;

  _auth = null;

  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDm_dXL-x8vjJc2lzJpQxW6369Arv2sLp0',
      authDomain: 'food-tracker-c6279.firebaseapp.com',
      projectId: 'food-tracker-c6279',
    });
  }

  get auth(): any {
    if (this._auth === null) {
      this._auth = firebase.auth();
    }

    return this._auth;
  }

  checkAuth(): Promise<User> {
    return new Promise(async (resolve, reject) => {
      this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      this.auth.onAuthStateChanged(user => {
        if (user) {
          const db = firebase.firestore();
          const entriesRef = db.collection('entries');

          this.user = user;

          const { uid } = user;

          this.exercise = new Store(entriesRef, 'exercise', uid);
          this.foods = new Store(entriesRef, 'food', uid);
          this.sleep = new Store(entriesRef, 'sleep', uid);
          this.symptoms = new Store(entriesRef, 'symptom', uid);

          resolve(user);
        } else {
          reject();
        }
      });
    });
  }

  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    this.auth.signInWithRedirect(provider);
  };

  signout = () => {
    firebase.auth().signOut();
  };
}
