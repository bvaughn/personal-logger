// @flow

import React, { Component } from 'react';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { ROUTES } from '../constants';
import CreateLink from '../components/CreateLink';
import LoadingSpinner from '../components/LoadingSpinner';
import SymptomEntry from '../components/SymptomEntry';

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
        <CreateLink key="Link" to={ROUTES.symptoms.new} />,
      ];
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const symptom = this.props.symptoms[index];

    return <SymptomEntry key={key} style={style} symptom={symptom} />;
  };
}
