// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { LOCALE_DATE_OPTIONS, ROUTES } from '../constants';
import { CreateIcon } from '../components/SvgIcons';
import RatingIcon from '../components/RatingIcon';

import type { RowRendererParams, Sleep } from '../types';

type Props = {
  sleep: Array<Sleep>,
};

export default class ListSleep extends Component<Props> {
  render() {
    const { sleep } = this.props;

    return [
      <AutoSizer key="AutoSizer">
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={sleep.length}
            rowHeight={54 /* 3rem */}
            rowRenderer={this._rowRenderer}
          />
        )}
      </AutoSizer>,

      <Link className="create-link" key="Link" to={ROUTES.sleep.new}>
        <CreateIcon className="create-link-svg" />
      </Link>,
    ];
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    const sleep = this.props.sleep[index];

    return (
      <Link
        className="list-entry"
        key={key}
        style={style}
        to={ROUTES.sleep.editLink(sleep)}
      >
        <div className="list-entry-title">
          <RatingIcon
            className="list-entry-rating-icon"
            rating={sleep.rating}
          />{' '}
          {sleep.duration} hours
        </div>
        <small className="list-entry-date">
          ({sleep.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
        </small>
      </Link>
    );
  };
}
