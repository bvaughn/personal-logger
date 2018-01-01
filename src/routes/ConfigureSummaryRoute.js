// @flow

import React, { Component } from 'react';
import {
  DateStartIcon,
  DateStopIcon,
  EatIcon,
  HeartIcon,
  SleepIcon,
  SymptomIcon,
} from '../components/SvgIcons';
import { ROUTES } from '../constants';
import { getDateString } from '../utils';

import type { History } from '../types';

type Props = {
  history: History,
};

type State = {
  isExerciseSelected: boolean,
  isFoodSelected: boolean,
  isSleepSelected: boolean,
  isSymptomSelected: boolean,
  startDate: string | null,
  stopDate: string | null,
};

export default class Summary extends Component<Props, State> {
  state: State = {
    isExerciseSelected: true,
    isFoodSelected: true,
    isSleepSelected: true,
    isSymptomSelected: true,
    startDate: null,
    stopDate: getDateString(new Date()),
  };

  render() {
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
          </div>
        </section>
        <section className="new-form-section">
          <button className="new-form-save-button">Submit</button>
        </section>
      </form>
    );
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

    this.props.history.push(
      ROUTES.summary.resultsLink(startDate, stopDate, categories)
    );
  };
}
