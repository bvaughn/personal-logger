// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import RatingIcon from '../components/RatingIcon';
import { SleepingIcon } from '../components/SvgIcons';

import type { Sleep } from '../types';

type Props = {
  sleep: Sleep,
  style: Object,
};

const SleepEntry = ({ sleep, style }: Props) => (
  <Link className="list-entry" style={style} to={ROUTES.sleep.editLink(sleep)}>
    <div className="list-entry-title">
      <SleepingIcon className="flex-icon-left" />
      {sleep.duration} hours{getAwakeningsLabel(sleep.awakenings)}
      <RatingIcon className="flex-icon-right" rating={sleep.rating} />
    </div>
    <small className="list-entry-date">
      ({sleep.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
    </small>
  </Link>
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
