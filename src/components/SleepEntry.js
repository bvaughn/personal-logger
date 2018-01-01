// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import RatingIcon from '../components/RatingIcon';

import type { Sleep } from '../types';

type Props = {
  sleep: Sleep,
  style: Object,
};

const SleepEntry = ({ sleep, style }: Props) => (
  <Link className="list-entry" style={style} to={ROUTES.sleep.editLink(sleep)}>
    <div className="list-entry-title">
      <RatingIcon className="list-entry-rating-icon" rating={sleep.rating} />{' '}
      {sleep.duration} hours
    </div>
    <small className="list-entry-date">
      ({sleep.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
    </small>
  </Link>
);

export default SleepEntry;
