// @flow

import React from 'react';
import EditFoodForm from '../components/EditFoodForm';

import type { Food } from '../types';

type Props = {
  saveFn: (food: Food) => Promise<void>,
};

export default function NewFood({ saveFn }: Props) {
  const food = {
    date: new Date(),
    ingredients: [],
    notes: '',
    title: '',
    type: 'food',
  };

  return <EditFoodForm saveFn={saveFn} food={food} />;
}
