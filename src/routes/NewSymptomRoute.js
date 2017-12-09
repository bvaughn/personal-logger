// @flow

import React from 'react';
import EditSymptomForm from '../components/EditSymptomForm';

import type { Symptom } from '../types';

type Props = {
  saveFn: (symptom: Symptom) => Promise<void>,
};

export default function NewSymptom({ saveFn }: Props) {
  const symptom = {
    date: new Date(),
    notes: '',
    rating: 3,
    type: 'stomach',
  };

  return <EditSymptomForm saveFn={saveFn} symptom={symptom} />;
}
