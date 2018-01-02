// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { EnergyIcon, StomachIcon } from '../components/SvgIcons';
import CreateLinkIcon from '../components/CreateLinkIcon';
import LoadingSpinner from '../components/LoadingSpinner';
import RatingIcon from '../components/RatingIcon';

import type { RowRendererParams, Symptom } from '../types';

type Props = {
  symptoms: Array<Symptom> | null,
};

export default class ListSymptoms extends Component<Props> {
  render() {
    const { symptoms } = this.props;

    if (symptoms === null) {
      return <LoadingSpinner />;
    } else {
      return [
        <AutoSizer key="AutoSizer">
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={symptoms.length}
              rowHeight={54 /* 3rem */}
              rowRenderer={this._rowRenderer}
            />
          )}
        </AutoSizer>,

        <Link key="Link" to={ROUTES.symptoms.new}>
          <CreateLinkIcon />
        </Link>,
      ];
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const symptom = this.props.symptoms[index];

    return (
      <Link
        className="list-entry"
        key={key}
        params={{ id: symptom.id }}
        style={style}
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
          {symptom.date.toLocaleTimeString('en-US', LOCALE_TIME_OPTIONS)}
        </div>
        <small className="list-entry-date">
          ({symptom.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
        </small>
      </Link>
    );
  };
}

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
