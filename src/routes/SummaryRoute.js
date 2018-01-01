// @flow

import React, { Component } from 'react';
import LoadingError from '../components/LoadingError';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  DateStartIcon,
  DateStopIcon,
  EatIcon,
  HeartIcon,
  SleepIcon,
  SymptomIcon,
} from '../components/SvgIcons';
import { getDate, getDateString } from '../utils';

import type { Exercise, Food, Sleep, Symptom } from '../types';

type Props = {
  runQuery: (
    startDate: Date | null,
    stopDate: Date | null,
    categories: Array<string>
  ) => Promise<Array<Exercise | Food | Sleep | Symptom>>,
};

// TODO Split this out into 2 states
// Move fiter params into the URL
type State = {
  error: Error | null,
  isLoading: boolean,
  isExerciseSelected: boolean,
  isFoodSelected: boolean,
  isSleepSelected: boolean,
  isSymptomSelected: boolean,
  summary: Array<Exercise | Food | Sleep | Symptom> | null,
  startDate: string | null,
  stopDate: string | null,
};

export default class Summary extends Component<Props, State> {
  state: State = {
    error: null,
    isLoading: false,
    isExerciseSelected: true,
    isFoodSelected: true,
    isSleepSelected: true,
    isSymptomSelected: true,
    startDate: null,
    stopDate: getDateString(new Date()),
    summary: null,
  };

  render() {
    const { error, isLoading, summary } = this.state;

    if (error) {
      return <LoadingError />;
    } else if (isLoading) {
      return <LoadingSpinner />;
    } else if (summary === null) {
      return this._renderForm();
    } else {
      return this._renderSummary();
    }
  }

  _renderForm() {
    const {
      isLoading,
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
        disabled={isLoading}
        onSubmit={this._onSubmit}
        autocapitalize="none"
      >
        <section className="new-form-section">
          <div className="new-form-section-header">Date Range</div>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header">
            <DateStartIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              disabled={isLoading}
              name="startDate"
              onChange={this._onStartDateChange}
              type="date"
              value={startDate || ''}
            />
          </div>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header">
            <DateStopIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              disabled={isLoading}
              name="stopDate"
              onChange={this._onStopDateChange}
              type="date"
              value={stopDate || ''}
            />
          </div>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header">Include</div>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header new-form-section-header-types">
            <label className="new-form-rating-radio-label">
              <SleepIcon
                className={`new-form-type-svg ${
                  isSleepSelected ? 'new-form-type-svg-active' : ''
                }`}
              />
              <input
                checked={isSleepSelected}
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
                name="type"
                onChange={this._onIsSymptomChange}
                type="checkbox"
                value="drink"
              />
            </label>
          </div>
        </section>
        <section className="new-form-section">
          <button className="new-form-save-button" disabled={isLoading}>
            Submit
          </button>
        </section>
      </form>
    );
  }

  _renderSummary() {
    const { summary } = this.state;

    return <div>TODO</div>;
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

    this.setState(
      {
        isLoading: true,
      },
      async () => {
        const {
          isExerciseSelected,
          isFoodSelected,
          isSleepSelected,
          isSymptomSelected,
          startDate,
          stopDate,
        } = this.state;

        try {
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

          const summary = await this.props.runQuery(
            startDate ? getDate(startDate) : null,
            stopDate ? getDate(stopDate) : null,
            categories
          );

          this.setState({ isLoading: false, summary });
        } catch (error) {
          console.error(error);

          this.setState({ isLoading: false, error });
        }
      }
    );
  };
}
