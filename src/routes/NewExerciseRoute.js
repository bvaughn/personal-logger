// @flow

import React from 'react';
import EditExerciseForm from '../components/EditExerciseForm';

import type { Exercise, History } from '../types';

type Props = {
  history: History,
  saveFn: (exercise: Exercise) => Promise<void>,
};

export default function NewExercise({ history, saveFn }: Props) {
  const exercise = {
    date: new Date(),
    distance: 0,
    duration: 0,
    intensity: 2,
    notes: '',
    type: 'cardio',
  };

  return (
    <EditExerciseForm history={history} exercise={exercise} saveFn={saveFn} />
  );
}
