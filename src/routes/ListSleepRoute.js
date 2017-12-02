// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import { BadFaceIcon, BestFaceIcon, GoodFaceIcon, NeutralFaceIcon, WorstFaceIcon } from '../components/FlatIcon';

import type { Sleep } from '../types';

type Props = {
  sleep: Array<Sleep>,
};

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
          <RatingIcon rating={sleep.rating} /> {sleep.duration} hours
        </div>
        <small className="list-entry-date">
          ({sleep.date.toLocaleDateString("en-US", LOCALE_DATE_OPTIONS)})
        </small>
      </Link>
    ));
  }
}

const RatingIcon = ({ rating }) => {
  switch (rating) {
    case 0:
      return <WorstFaceIcon className="list-entry-rating-icon" />;
    case 1:
      return <BadFaceIcon className="list-entry-rating-icon" />;
    case 2:
      return <NeutralFaceIcon className="list-entry-rating-icon" />;
    case 3:
      return <GoodFaceIcon className="list-entry-rating-icon" />;
    case 4:
      return <BestFaceIcon className="list-entry-rating-icon" />
  }
}
