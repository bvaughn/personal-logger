// @flow

import React from 'react';
import EditSleepForm from '../components/EditSleepForm';

import type { History, Sleep } from '../types';

type Props = {
  history: History,
  saveFn: (sleep: Sleep) => Promise<void>,
};

export default function NewSleep({ history, saveFn }: Props) {
  const sleep = {
    awakenings: 0,
    date: new Date(),
    duration: 7,
    notes: '',
    rating: 2,
  };

  return <EditSleepForm history={history} saveFn={saveFn} sleep={sleep} />;
}
