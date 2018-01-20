// @flow

import React from 'react';
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import { HeartIcon, StrengthIcon } from '../components/SvgIcons';
import {
  ListEntry,
  ListEntryTitle,
  ListEntryDate,
} from '../components/ListEntry';

import type { Exercise } from '../types';

type Props = {
  exercise: Exercise,
  style: Object,
};

const ExerciseEntry = ({ exercise, style }: Props) => (
  <ListEntry
    id={exercise.id}
    style={style}
    to={ROUTES.exercise.editLink(exercise)}
  >
    <ListEntryTitle>
      <TypeIcon type={exercise.type} />
      <Summary
        distance={exercise.distance}
        duration={exercise.duration}
        type={exercise.type}
      />
    </ListEntryTitle>
    <ListEntryDate>
      ({exercise.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
    </ListEntryDate>
  </ListEntry>
);

export default ExerciseEntry;

const Summary = ({ distance, duration, type }) => {
  switch (type) {
    case 'cardio':
      return `${duration} mins, ${distance} miles`;
    case 'strength':
      return `${duration} mins`;
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
};

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'cardio':
      return <HeartIcon className="flex-icon-left" />;
    case 'strength':
      return <StrengthIcon className="flex-icon-left" />;
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
};
