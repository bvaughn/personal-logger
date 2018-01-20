// @flow

import React from 'react';
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { EnergyIcon, StomachIcon } from '../components/SvgIcons';
import RatingIcon from '../components/RatingIcon';
import {
  ListEntry,
  ListEntryTitle,
  ListEntryTime,
  ListEntryDate,
} from '../components/ListEntry';

import type { Symptom } from '../types';

type Props = {
  symptom: Symptom,
  style: Object,
};

const SymptomEntry = ({ symptom, style }: Props) => (
  <ListEntry
    id={symptom.id}
    style={style}
    to={ROUTES.symptoms.editLink(symptom)}
  >
    <ListEntryTitle>
      <TypeIcon type={symptom.type} />
      <RatingIcon className="flex-icon-left" rating={symptom.rating} />
    </ListEntryTitle>
    <ListEntryTime>
      {symptom.date.toLocaleTimeString('en-US', LOCALE_TIME_OPTIONS)}
    </ListEntryTime>
    <ListEntryDate>
      ({symptom.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
    </ListEntryDate>
  </ListEntry>
);

export default SymptomEntry;

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'energy':
      return <EnergyIcon className="flex-icon-left" />;
    case 'stomach':
      return <StomachIcon className="flex-icon-left" />;
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
};
