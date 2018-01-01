// @flow

import React, { Component } from 'react';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import ExerciseEntry from '../components/ExerciseEntry';
import FoodEntry from '../components/FoodEntry';
import LoadingError from '../components/LoadingError';
import LoadingSpinner from '../components/LoadingSpinner';
import SleepEntry from '../components/SleepEntry';
import SymptomEntry from '../components/SymptomEntry';
import { getDate } from '../utils';

import type {
  Exercise,
  Food,
  RowRendererParams,
  Sleep,
  Symptom,
} from '../types';

type Props = {
  categories: string,
  runQuery: (
    startDate: Date | null,
    stopDate: Date | null,
    categories: Array<string>
  ) => Promise<Array<Exercise | Food | Sleep | Symptom>>,
  startDate: string,
  stopDate: string,
};

type State = {
  error: Error | null,
  isLoading: boolean,
  summary: Array<Exercise | Food | Sleep | Symptom> | null,
};

export default class SummaryResultsRoute extends Component<Props, State> {
  state: State = {
    error: null,
    isLoading: true,
    summary: null,
  };

  componentDidMount() {
    this._loadSummary();
  }

  render() {
    const { error, isLoading, summary } = this.state;

    if (error) {
      return <LoadingError />;
    } else if (isLoading) {
      return <LoadingSpinner />;
    }

    // $FlowFixMe We know this is not null
    const rowCount = summary.length;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={54 /* 3rem */}
            rowRenderer={this._rowRenderer}
          />
        )}
      </AutoSizer>
    );
  }

  async _loadSummary() {
    const { categories, startDate, stopDate } = this.props;

    try {
      const summary = await this.props.runQuery(
        startDate !== '-' ? getDate(startDate) : null,
        stopDate !== '-' ? getDate(stopDate, '23:59:59') : null,
        categories.split(',')
      );

      this.setState({ isLoading: false, summary });
    } catch (error) {
      console.error(error);

      this.setState({ isLoading: false, error });
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const entry = this.state.summary[index];

    switch (entry['$category']) {
      case 'exercise':
        return (
          <ExerciseEntry
            exercise={((entry: any): Exercise)}
            key={key}
            style={style}
          />
        );
      case 'food':
        return (
          <FoodEntry food={((entry: any): Food)} key={key} style={style} />
        );
      case 'sleep':
        return (
          <SleepEntry key={key} sleep={((entry: any): Sleep)} style={style} />
        );
      case 'symptom':
        return (
          <SymptomEntry
            key={key}
            style={style}
            symptom={((entry: any): Symptom)}
          />
        );
      default:
        throw Error(`Unexpected category "${entry['$category'] || ''}"`);
    }
  };
}
