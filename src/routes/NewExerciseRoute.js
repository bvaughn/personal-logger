// @flow

import React from 'react';
import EditExerciseForm from '../components/EditExerciseForm';

import type { Exercise } from '../types';

type Props = {
  saveFn: (exercise: Exercise) => Promise<void>,
};

export default function NewExercise({ saveFn }: Props) {
  const exercise = {
    date: new Date(),
    distance: 0,
    duration: 0,
    intensity: 2,
    notes: '',
    type: 'cardio',
  };

  return <EditExerciseForm saveFn={saveFn} exercise={exercise} />;
}
