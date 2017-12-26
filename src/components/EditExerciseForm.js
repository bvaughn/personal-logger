// @flow

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import {
  DateIcon,
  HeartIcon,
  StrengthIcon,
  TimeIcon,
} from '../components/SvgIcons';
import { getDate, getDateString, getTimeString } from '../utils';
import IntensityIcon from './IntensityIcon';

import type { Exercise, History } from '../types';

type Props = {
  deleteFn?: () => Promise<void>,
  exercise: Exercise,
  history: History,
  saveFn: (exercise: Exercise) => Promise<void>,
};

type State = {
  date: string,
  hasConfirmed: boolean,
  isSaving: boolean,
  exercise: Exercise,
  time: string,
};

export default class EditExerciseForm extends Component<Props, State> {
  state: State = {
    date: getDateString(this.props.exercise.date),
    exercise: { ...this.props.exercise }, // Shallow clone for editing
    hasConfirmed: false,
    isSaving: false,
    time: getTimeString(this.props.exercise.date),
  };

  render() {
    const { deleteFn } = this.props;
    const { date, hasConfirmed, isSaving, exercise, time } = this.state;

    return (
      <form
        className="new-form"
        disabled={isSaving}
        onSubmit={this._onSubmit}
        autocapitalize="none"
      >
        <section className="new-form-section">
          <div className="new-form-section-header">
            <DateIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              disabled={isSaving}
              name="date"
              onChange={this._onDateChange}
              type="date"
              value={date}
            />
          </div>
          <div className="new-form-section-header">
            <TimeIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              disabled={isSaving}
              name="time"
              onChange={this._onTimeChange}
              type="time"
              value={time}
            />
          </div>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header new-form-section-header-types">
            <label className="new-form-rating-radio-label">
              <small>Cardio</small>
              <HeartIcon
                className={`new-form-type-svg ${
                  exercise.type === 'cardio' ? 'new-form-type-svg-active' : ''
                }`}
              />
              <input
                checked={exercise.type === 'cardio'}
                disabled={isSaving}
                name="type"
                onChange={this._onTypeChange}
                type="radio"
                value="cardio"
              />
            </label>
            <label className="new-form-rating-radio-label">
              <small>Strength</small>
              <StrengthIcon
                className={`new-form-type-svg ${
                  exercise.type === 'strength' ? 'new-form-type-svg-active' : ''
                }`}
              />
              <input
                checked={exercise.type === 'strength'}
                disabled={isSaving}
                name="type"
                onChange={this._onTypeChange}
                type="radio"
                value="strength"
              />
            </label>
          </div>
        </section>
        {exercise.type === 'cardio' && (
          <section className="new-form-section">
            <div className="new-form-section-header">
              Distance&nbsp;<small>(miles)</small>
              <input
                className="new-form-input"
                disabled={isSaving}
                name="duration"
                onChange={this._onDistanceChange}
                type="number"
                value={exercise.distance || ''}
              />
            </div>
          </section>
        )}
        <section className="new-form-section">
          <div className="new-form-section-header">
            Duration&nbsp;<small>(minutes)</small>
            <input
              className="new-form-input"
              disabled={isSaving}
              name="duration"
              onChange={this._onDurationChange}
              type="number"
              value={exercise.duration || ''}
            />
          </div>
        </section>
        <section className="new-form-section">Intensity</section>
        <section className="new-form-section">
          <div className="new-form-section-header">
            <IntensityRadioOption
              intensity={exercise.intensity}
              isSaving={isSaving}
              onChange={this._onIntensityChange}
              value={1}
            />
            <IntensityRadioOption
              intensity={exercise.intensity}
              isSaving={isSaving}
              onChange={this._onIntensityChange}
              value={2}
            />
            <IntensityRadioOption
              intensity={exercise.intensity}
              isSaving={isSaving}
              onChange={this._onIntensityChange}
              value={3}
            />
          </div>
        </section>
        <section className="new-form-section">
          <button className="new-form-save-button" disabled={isSaving}>
            Save
          </button>
        </section>
        {!!deleteFn && (
          <section className="new-form-section">
            <button
              className="new-form-delete-button"
              disabled={isSaving}
              onClick={this._onDelete}
            >
              {hasConfirmed ? 'Are you sure?' : 'Delete'}
            </button>
          </section>
        )}
        <section className="new-form-section">
          <NavLink to={ROUTES.exercise.list}>
            <button className="new-form-cancel-button" disabled={isSaving}>
              Cancel
            </button>
          </NavLink>
        </section>
      </form>
    );
  }

  _onDateChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      date: event.currentTarget.value,
    });
  };

  _onDelete = (event: Event) => {
    event.preventDefault();

    if (!this.state.hasConfirmed) {
      this.setState({
        hasConfirmed: true,
      });
    } else {
      this.setState(
        {
          isSaving: true,
        },
        this.props.deleteFn
      );
    }
  };

  _onDistanceChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const distance = parseFloat(event.currentTarget.value) || 0;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        distance,
      },
    }));
  };

  _onDurationChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const duration = parseInt(event.currentTarget.value, 10) || 0;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        duration,
      },
    }));
  };

  _onIntensityChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const intensity = parseInt(event.currentTarget.value, 10) || 1;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        intensity,
      },
    }));
  };

  _onNotesChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const notes = event.currentTarget.value;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        notes,
      },
    }));
  };

  _onSubmit = (event: Event) => {
    event.preventDefault();

    const { history, saveFn } = this.props;
    const { date, exercise, time } = this.state;

    exercise.date = getDate(date, time);

    this.setState(
      {
        isSaving: true,
      },
      async () => {
        await saveFn(exercise);

        history.push(ROUTES.exercise.list);
      }
    );
  };

  _onTimeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      time: event.currentTarget.value,
    });
  };

  _onTypeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const type = event.currentTarget.value;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        type,
      },
    }));
  };
}

const IntensityRadioOption = ({ isSaving, intensity, onChange, value }) => (
  <label className="new-form-rating-radio-label">
    <IntensityIcon
      className={`new-form-rating-svg ${
        intensity === value ? 'new-form-rating-svg-active' : ''
      }`}
      intensity={value}
    />
    <input
      checked={intensity === value}
      disabled={isSaving}
      name="intensity"
      onChange={onChange}
      type="radio"
      value={value}
    />
  </label>
);
