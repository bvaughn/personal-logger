// @flow

import React from 'react';
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import RatingIcon from '../components/RatingIcon';
import { SleepingIcon } from '../components/SvgIcons';
import {
  ListEntry,
  ListEntryTitle,
  ListEntryDate,
} from '../components/ListEntry';

import type { Sleep } from '../types';

type Props = {
  sleep: Sleep,
  style: Object,
};

const SleepEntry = ({ sleep, style }: Props) => (
  <ListEntry id={sleep.id} style={style} to={ROUTES.sleep.editLink(sleep)}>
    <ListEntryTitle>
      <SleepingIcon className="flex-icon-left" />
      {sleep.duration} hours{getAwakeningsLabel(sleep.awakenings)}
      <RatingIcon className="flex-icon-right" rating={sleep.rating} />
    </ListEntryTitle>
    <ListEntryDate>
      ({sleep.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
    </ListEntryDate>
  </ListEntry>
);

const getAwakeningsLabel = awakenings => {
  switch (awakenings) {
    case 0:
      return '';
    case 1:
      return ', woke once';
    case 2:
      return ', woke twice';
    default:
      return `, woke ${awakenings} times`;
  }
};

export default SleepEntry;
