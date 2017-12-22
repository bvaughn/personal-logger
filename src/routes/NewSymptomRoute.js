// @flow

import React from 'react';
import EditSymptomForm from '../components/EditSymptomForm';

import type { History, Symptom } from '../types';

type Props = {
  history: History,
  saveFn: (symptom: Symptom) => Promise<void>,
};

export default function NewSymptom({ history, saveFn }: Props) {
  const symptom = {
    date: new Date(),
    notes: '',
    rating: 3,
    type: 'stomach',
  };

  return (
    <EditSymptomForm history={history} saveFn={saveFn} symptom={symptom} />
  );
}
