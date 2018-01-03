// @flow

import React, { Component } from 'react';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { ROUTES } from '../constants';
import SleepEntry from '../components/SleepEntry';
import CreateLink from '../components/CreateLink';
import LoadingSpinner from '../components/LoadingSpinner';

import type { RowRendererParams, Sleep } from '../types';

type Props = {
  sleep: Array<Sleep> | null,
};

export default class ListSleep extends Component<Props> {
  render() {
    const { sleep } = this.props;

    if (sleep === null) {
      return <LoadingSpinner />;
    } else {
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
        <CreateLink key="Link" to={ROUTES.sleep.new} />,
      ];
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const sleep = this.props.sleep[index];

    return <SleepEntry key={key} sleep={sleep} style={style} />;
  };
}
