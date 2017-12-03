// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import RatingIcon from '../components/RatingIcon';

import type { Sleep } from '../types';

type Props = {
  sleep: Array<Sleep>,
};

// TODO Add react-virtualized

export default class ListSleep extends Component<Props> {
  render() {
    const { sleep } = this.props;

    return sleep.map(sleep => (
      <Link
        className="list-entry"
        key={sleep.id}
        to={ROUTES.sleep.editLink(sleep)}
      >
        <div className="list-entry-title">
          <RatingIcon className="list-entry-rating-icon" rating={sleep.rating} /> {sleep.duration} hours
        </div>
        <small className="list-entry-date">
          ({sleep.date.toLocaleDateString("en-US", LOCALE_DATE_OPTIONS)})
        </small>
      </Link>
    ));
  }
}