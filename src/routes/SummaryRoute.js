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
import FormSectionHeader from '../components/form/FormSectionHeader';
import {
  DateStartIcon,
  DateStopIcon,
  EatIcon,
  HeartIcon,
  SleepIcon,
  SymptomIcon,
} from '../components/SvgIcons';
import { downloadData, getDate, getDateString } from '../utils';

import type {
  Exercise,
  Food,
  RowRendererParams,
  Sleep,
  Symptom,
} from '../types';

type Props = {
  runQuery: (
    startDate: Date | null,
    stopDate: Date | null,
    categories: Array<string>
  ) => Promise<Array<Exercise | Food | Sleep | Symptom>>,
};

type State = {
  entries: Array<Exercise | Food | Sleep | Symptom> | null,
  error: Error | null,
  isExerciseSelected: boolean,
  isFoodSelected: boolean,
  isLoading: boolean,
  isSleepSelected: boolean,
  isSymptomSelected: boolean,
  showSummary: boolean,
  startDate: string | null,
  stopDate: string | null,
};

export default class Summary extends Component<Props, State> {
  state: State = {
    entries: null,
    error: null,
    isExerciseSelected: true,
    isFoodSelected: true,
    isLoading: false,
    isSleepSelected: true,
    isSymptomSelected: true,
    showSummary: false,
    startDate: null,
    stopDate: getDateString(new Date()),
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.isLoading && !prevState.isLoading) {
      this._loadSummary();
    }
  }

  render() {
    if (this.state.showSummary) {
      return this._renderSummary();
    } else {
      return this._renderForm();
    }
  }

  _renderForm() {
    const {
      isExerciseSelected,
      isFoodSelected,
      isSleepSelected,
      isSymptomSelected,
      startDate,
      stopDate,
    } = this.state;

    return (
      <form
        className="new-form"
        onSubmit={this._onSubmit}
        autoCapitalize="none"
      >
        <section className="new-form-section">
          <FormSectionHeader>
            <DateStartIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              name="startDate"
              onChange={this._onStartDateChange}
              type="date"
              value={startDate || ''}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            <DateStopIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              name="stopDate"
              onChange={this._onStopDateChange}
              type="date"
              value={stopDate || ''}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader className="new-form-section-header-types">
            <label className="new-form-rating-radio-label">
              <SleepIcon
                className={`new-form-type-svg ${
                  isSleepSelected ? 'new-form-type-svg-active' : ''
                }`}
              />
              <input
                checked={isSleepSelected}
                name="type"
                onChange={this._onIsSleepChange}
                type="checkbox"
                value="drink"
              />
            </label>
            <label className="new-form-rating-radio-label">
              <EatIcon
                className={`new-form-type-svg ${
                  isFoodSelected ? 'new-form-type-svg-active' : ''
                }`}
              />
              <input
                checked={isFoodSelected}
                name="type"
                onChange={this._onIsFoodChange}
                type="checkbox"
                value="food"
              />
            </label>
            <label className="new-form-rating-radio-label">
              <HeartIcon
                className={`new-form-type-svg ${
                  isExerciseSelected ? 'new-form-type-svg-active' : ''
                }`}
              />
              <input
                checked={isExerciseSelected}
                name="type"
                onChange={this._onIsExerciseChange}
                type="checkbox"
                value="drink"
              />
            </label>
            <label className="new-form-rating-radio-label">
              <SymptomIcon
                className={`new-form-type-svg ${
                  isSymptomSelected ? 'new-form-type-svg-active' : ''
                }`}
              />
              <input
                checked={isSymptomSelected}
                name="type"
                onChange={this._onIsSymptomChange}
                type="checkbox"
                value="drink"
              />
            </label>
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <button className="new-form-save-button">Show Summary</button>
        </section>
      </form>
    );
  }

  _renderSummary() {
    const { entries, error, isLoading, showSummary } = this.state;

    if (!showSummary) {
      return null;
    } else if (error) {
      return <LoadingError />;
    } else if (isLoading) {
      return <LoadingSpinner />;
    } else if (entries !== null) {
      return (
        <div className="summary-container">
          <div className="summary-auto-sizer-wrapper">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  width={width}
                  height={height}
                  rowCount={entries.length}
                  rowHeight={54 /* 3rem */}
                  rowRenderer={this._rowRenderer}
                />
              )}
            </AutoSizer>
          </div>
          <hr />
          <button className="new-form-save-button" onClick={this._onDownload}>
            Download
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const entry = this.state.entries[index];

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

  async _loadSummary() {
    const {
      isExerciseSelected,
      isFoodSelected,
      isSleepSelected,
      isSymptomSelected,
      startDate,
      stopDate,
    } = this.state;

    const categories = [];
    if (isExerciseSelected) {
      categories.push('exercise');
    }
    if (isFoodSelected) {
      categories.push('food');
    }
    if (isSleepSelected) {
      categories.push('sleep');
    }
    if (isSymptomSelected) {
      categories.push('symptom');
    }

    try {
      const entries = await this.props.runQuery(
        startDate !== null ? getDate(startDate) : null,
        stopDate !== null ? getDate(stopDate, '23:59:59') : null,
        categories
      );

      this.setState({ isLoading: false, entries });
    } catch (error) {
      console.error(error);

      this.setState({ isLoading: false, error });
    }
  }

  _onIsExerciseChange = (event: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState({
      isExerciseSelected: event.currentTarget.checked,
    });

  _onIsFoodChange = (event: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState({
      isFoodSelected: event.currentTarget.checked,
    });

  _onIsSleepChange = (event: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState({
      isSleepSelected: event.currentTarget.checked,
    });

  _onIsSymptomChange = (event: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState({
      isSymptomSelected: event.currentTarget.checked,
    });

  _onStartDateChange = (event: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState({
      startDate: event.currentTarget.value,
    });

  _onStopDateChange = (event: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState({
      stopDate: event.currentTarget.value,
    });

  _onSubmit = (event: Event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      showSummary: true,
    });
  };

  _onDownload = (event: Event) => {
    event.preventDefault();

    downloadData(
      'personal-logger-export.txt',
      JSON.stringify(this.state.entries)
    );
  };
}
