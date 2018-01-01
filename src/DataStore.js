// @flow

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import type {
  AuthenticationType,
  Exercise,
  Food,
  Sleep,
  Symptom,
  User,
} from './types';

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
      .limit(40)
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
  _entriesRef = null;

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

          this._entriesRef = db.collection('entries');

          this.user = user;

          const { uid } = user;

          this.exercise = new Store(this._entriesRef, 'exercise', uid);
          this.foods = new Store(this._entriesRef, 'food', uid);
          this.sleep = new Store(this._entriesRef, 'sleep', uid);
          this.symptoms = new Store(this._entriesRef, 'symptom', uid);

          resolve(user);
        } else {
          reject();
        }
      });
    });
  }

  login = (type: AuthenticationType) => {
    let provider;

    switch (type) {
      //case 'facebook':
      //provider = new firebase.auth.FacebookAuthProvider();
      //break;
      case 'github':
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      default:
        throw Error(`Unexpected login type "${type}"`);
    }

    this.auth.signInWithRedirect(provider);
  };

  runQuery = (
    startDate: Date | null,
    stopDate: Date | null,
    categories: Array<string>
  ): Promise<Array<Exercise | Food | Sleep | Symptom>> => {
    let resolve;
    const promise = new Promise((...args) => {
      resolve = args[0];
    });

    // Convert to map for faster client-side filtering :(
    const categoryMap = categories.reduce((map, category) => {
      map[category] = true;
      return map;
    }, {});

    // $FlowFixMe We know this is not null
    const { uid } = this.user;

    // Firestore doesn't support logical OR,
    // Nor can we use an inverted logical AND because it doesn't support the "!=" operator.
    // So (for now) I'm being lazy and filtering on the client.
    // The alternative would be to run multiple queries and join them on the client.
    // TODO Run separate queries and merge the result.
    // $FlowFixMe We know this is not null
    let query = this._entriesRef.where('user', '==', uid);

    if (startDate !== null) {
      query = query.where('date', '>=', startDate);
    }
    if (stopDate !== null) {
      query = query.where('date', '<=', stopDate);
    }

    query.orderBy('date', 'desc').onSnapshot((snapshot: any) => {
      const results = [];

      snapshot.forEach(data => {
        const id = data.id;
        const record = {
          ...data.data(),
          id,
        };

        // Client-side category filtering :(
        if (categoryMap[record['$category']]) {
          results.push(record);
        }
      });

      resolve(results);
    });

    return promise;
  };

  signout = () => firebase.auth().signOut();
}
