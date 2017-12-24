// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import { CreateIcon, HeartIcon, StrengthIcon } from '../components/SvgIcons';
import LoadingSpinner from '../components/LoadingSpinner';

import type { RowRendererParams, Exercise } from '../types';

type Props = {
  exercise: Array<Exercise> | null,
  cssStyle: Object,
};

export default class ListExercise extends Component<Props> {
  render() {
    const { exercise, cssStyle } = this.props;

    if (exercise === null) {
      return <LoadingSpinner />;
    } else {
      return [
        <AutoSizer key="AutoSizer">
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={exercise.length}
              rowHeight={54 /* 3rem */}
              rowRenderer={this._rowRenderer}
            />
          )}
        </AutoSizer>,

        <Link
          className="create-link"
          key="Link"
          to={ROUTES.exercise.new}
          {...cssStyle}
        >
          <CreateIcon className="create-link-svg" />
        </Link>,
      ];
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const exercise = this.props.exercise[index];

    return (
      <Link
        className="list-entry"
        key={key}
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
  };
}

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
      return <HeartIcon className="list-entry-rating-icon" />;
    case 'strength':
      return <StrengthIcon className="list-entry-rating-icon" />;
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
};
