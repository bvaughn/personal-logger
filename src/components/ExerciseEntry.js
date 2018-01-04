// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import { HeartIcon, StrengthIcon } from '../components/SvgIcons';

import type { Exercise } from '../types';

type Props = {
  exercise: Exercise,
  style: Object,
};

const ExerciseEntry = ({ exercise, style }: Props) => (
  <Link
    className="list-entry"
    style={style}
    to={ROUTES.exercise.editLink(exercise)}
  >
    <div className="list-entry-title">
      <TypeIcon type={exercise.type} />
      <Summary
        distance={exercise.distance}
        duration={exercise.duration}
        type={exercise.type}
      />
    </div>
    <small className="list-entry-date">
      ({exercise.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
    </small>
  </Link>
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
