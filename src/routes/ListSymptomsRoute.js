// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { EnergyIcon, StomachIcon } from '../components/FlatIcon';
import RatingIcon from '../components/RatingIcon';

import type { Symptom } from '../types';

type Props = {
  symptoms: Array<Symptom>,
};

// TODO Add react-virtualized

export default class ListSymptoms extends Component<Props> {
  render() {
    const {symptoms} = this.props;

    return symptoms.map(symptom => (
      <Link
        className="list-entry"
        key={symptom.id}
        params={{ id: symptom.id }}
        to={ROUTES.symptoms.editLink(symptom)}
      >
        <div className="list-entry-title">
          <TypeIcon type={symptom.type} />
          <RatingIcon
            className="list-entry-rating-icon"
            rating={symptom.rating}
          />
        </div>
        <div className="list-entry-time">
          {symptom.date.toLocaleTimeString("en-US", LOCALE_TIME_OPTIONS)}
        </div>
        <small className="list-entry-date">
          ({symptom.date.toLocaleDateString("en-US", LOCALE_DATE_OPTIONS)})
        </small>
      </Link>
    ));
  }
}

const TypeIcon = ({ type }) => {
  switch (type) {
    case "energy":
      return <EnergyIcon className="list-entry-rating-icon" />;
    case "stomach":
      return <StomachIcon className="list-entry-rating-icon" />
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
}