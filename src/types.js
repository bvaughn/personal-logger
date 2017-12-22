// @flow

export type AuthenticationType = 'github' | 'twitter';

export type Exercise = {
  date: Date,
  distance: number,
  duration: number,
  id?: string,
  intensity: number,
  notes: string,
  type: string,
};

export type Food = {
  date: Date,
  id?: string,
  ingredients: Array<string>,
  notes: string,
  title: string,
  type: string,
};

export type History = {
  push: (path: string) => void,
};

export type RowRendererParams = {
  index: number,
  key: string,
  style: Object,
};

export type Sleep = {
  awakenings: number,
  date: Date,
  duration: number,
  id?: string,
  notes: string,
  rating: number,
};

export type Symptom = {
  date: Date,
  id?: string,
  notes: string,
  rating: number,
  type: string,
};

export type User = {
  displayName: string,
  email: string,
  photoURL: string,
  uid: string,
};
