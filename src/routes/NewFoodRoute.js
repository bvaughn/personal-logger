// @flow

import React from 'react';
import EditFoodForm from '../components/EditFoodForm';

import type { Food, History } from '../types';

type Props = {
  history: History,
  saveFn: (food: Food) => Promise<void>,
};

export default function NewFood({ history, saveFn }: Props) {
  const food = {
    date: new Date(),
    ingredients: [],
    notes: '',
    title: '',
    type: 'food',
  };

  return <EditFoodForm food={food} history={history} saveFn={saveFn} />;
}
