// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { EnergyIcon, StomachIcon } from '../components/SvgIcons';
import RatingIcon from '../components/RatingIcon';

import type { Symptom } from '../types';

type Props = {
  symptom: Symptom,
  style: Object,
};

const SymptomEntry = ({ symptom, style }: Props) => (
  <Link
    className="list-entry"
    params={{ id: symptom.id }}
    style={style}
    to={ROUTES.symptoms.editLink(symptom)}
  >
    <div className="list-entry-title">
      <TypeIcon type={symptom.type} />
      <RatingIcon className="list-entry-rating-icon" rating={symptom.rating} />
    </div>
    <div className="list-entry-time">
      {symptom.date.toLocaleTimeString('en-US', LOCALE_TIME_OPTIONS)}
    </div>
    <small className="list-entry-date">
      ({symptom.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
    </small>
  </Link>
);

export default SymptomEntry;

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'energy':
      return <EnergyIcon className="list-entry-rating-icon" />;
    case 'stomach':
      return <StomachIcon className="list-entry-rating-icon" />;
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
};
