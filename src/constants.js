// @flow

import type { Food, Sleep, Symptom } from './types';

export const ROUTES = {
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
