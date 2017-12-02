// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { BadFaceIcon, BestFaceIcon, EnergyIcon, GoodFaceIcon, NeutralFaceIcon, StomachIcon, WorstFaceIcon } from '../components/FlatIcon';

import type { Symptom } from '../types';

type Props = {
  symptoms: Array<Symptom>,
};

export default class ListSymptoms extends Component<Props> {
  render() {
    const {symptoms} = this.props;

    // TODO Edit and delete handlers

    return symptoms.map(symptom => (
      <Link
        className="list-entry"
        key={symptom.id}
        params={{ id: symptom.id }}
        to={ROUTES.symptoms.editLink(symptom)}
      >
        <div className="list-entry-title">
          <TypeIcon type={symptom.type} />
          <RatingIcon rating={symptom.rating} />
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

const TypeIcon = ({ type }) => {
  switch (type) {
    case "energy":
      return <EnergyIcon className="list-entry-rating-icon" />;
    case "stomach":
      return <StomachIcon className="list-entry-rating-icon" />
  }
}