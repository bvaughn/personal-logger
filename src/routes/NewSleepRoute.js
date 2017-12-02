// @flow

import React from 'react';
import EditSleepForm from '../components/EditSleepForm';

import type { Sleep } from '../types';

type Props = {
  saveFn: (sleep: Sleep) => Promise<void>,
};

export default function NewSleep({ saveFn }: Props) {
  const sleep = {
    awakenings: 0,
    date: new Date(),
    duration: 7,
    notes: '',
    rating: 2,
  };

  return (
    <EditSleepForm
      saveFn={saveFn}
      sleep={sleep}
    />
  );
}