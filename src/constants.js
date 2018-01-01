// @flow

import type { Exercise, Food, Sleep, Symptom } from './types';

export const ROUTES = {
  exercise: {
    edit: '/exercise/edit/:id',
    list: '/exercise',
    new: '/exercise/new',
    editLink: (food: Exercise) => food.id && `/exercise/edit/${food.id}`,
  },
  foods: {
    edit: '/foods/edit/:id',
    list: '/foods',
    new: '/foods/new',
    editLink: (food: Food) => food.id && `/foods/edit/${food.id}`,
  },
  sleep: {
    edit: '/sleep/edit/:id',
    list: '/sleep',
    new: '/sleep/new',
    editLink: (sleep: Sleep) => sleep.id && `/sleep/edit/${sleep.id}`,
  },
  summary: '/summary',
  symptoms: {
    edit: '/symptoms/edit/:id',
    list: '/symptoms',
    new: '/symptoms/new',
    editLink: (symptom: Symptom) =>
      symptom.id && `/symptoms/edit/${symptom.id}`,
  },
};

export const LOCALE_DATE_OPTIONS = {
  month: 'short',
  day: 'numeric',
};

export const LOCALE_TIME_OPTIONS = {
  hour: 'numeric',
  hourCycle: 'h12',
  minute: 'numeric',
};
